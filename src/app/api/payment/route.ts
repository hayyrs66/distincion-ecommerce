import { NextResponse } from 'next/server';
import crypto from 'crypto';

const EBI_API_KEY = process.env.EBI_API_KEY;
const EBI_USER = process.env.EBI_USER;
const EBI_PASSWORD = process.env.EBI_PASSWORD;

if (!EBI_API_KEY || !EBI_USER || !EBI_PASSWORD) {
  console.error('Missing required Ebipay environment variables');
}

const generateCartHash = (cartItems: any[]) => {
  return crypto
    .createHash('md5')
    .update(JSON.stringify(cartItems))
    .digest('hex')
    .substring(0, 8);
};


// POST: Create payment link
export async function POST(request: Request) {
  try {

    const body = await request.json();
    if (!body.amount || !body.customerEmail || !body.cartItems) {
      console.error('Incomplete data');
      return NextResponse.json(
        { error: "Incomplete payment data" },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append('llave', EBI_API_KEY);
    formData.append('usuario', EBI_USER);
    formData.append('clave', EBI_PASSWORD);


    const authResponse = await fetch('https://admlink.ebi.com.gt/api/login', {
      method: 'POST',
      body: formData
    });

    if (!authResponse.ok) {
      const authError = await authResponse.text();
      console.error('Authentication error:', authError);
      throw new Error('Authentication error with Ebipay');
    }

    const authData = await authResponse.json();
    console.log(authData);
    
    if (authData.result !== "success" || !authData.data || !authData.data.token) {
      throw new Error('Authentication failed: No token received');
    }
    const token = authData.data.token;


    const formDataRed = new FormData();
    formDataRed.append('llave', "24dd6249787d91870bf89b36fae4307bcbd21226");
    formDataRed.append('token', token);

    const redResponse = await fetch('https://admlink.ebi.com.gt/api/network/all',{
      method: 'POST',
      body: formDataRed
    });


    if (!redResponse.ok) {
      const authError = await redResponse.text();
      console.error('Codigos de redes no recuperadas:', authError);
      throw new Error('Codigos de redes no obtenidos de Ebipay');
    }

    const redData = await redResponse.json();

    const codeRed = redData.data[6].codigo;

    const orderRef = `DST-${Date.now()}-${generateCartHash(body.cartItems)}`;
    
    const productNames = body.cartItems.map((item: any) => item.name).join(', ');
    const description = productNames.length > 100 
      ? `${productNames.substring(0, 97)}...` 
      : productNames;


    const estadoActivo = 1;

    const formDataPayment = new FormData();
    formDataPayment.append('llave', EBI_API_KEY);
    formDataPayment.append('token', token);
    formDataPayment.append('nombre_interno', `Compra Distinction ${orderRef}`);
    formDataPayment.append('codigo_interno', orderRef);
    formDataPayment.append('título', "Compra en Tienda Distinction");
    formDataPayment.append('descripción', `Compra de ${description}`);
    formDataPayment.append('monto', parseFloat(body.amount).toFixed(2));
    formDataPayment.append('estado', `${estadoActivo}`);
    formDataPayment.append('cuotas', "VC00");
    formDataPayment.append('redes_sociales', codeRed);



    const paymentResponse = await fetch('https://admlink.ebi.com.gt/api/link/maintenance', {
      method: 'POST',
      body: formDataPayment
    });

    if (!paymentResponse.ok) {
      const paymentError = await paymentResponse.text();
      console.error('Error creating payment link:', paymentError);
      throw new Error('Error creating payment link');
    }

    const paymentData = await paymentResponse.json();

    if (paymentData.result === "error" || !paymentData.data || paymentData.data.length === 0) {
      throw new Error(paymentData.message || 'Error creating payment link: Response contains no data');
    }


    return NextResponse.json({ 
      paymentUrl: paymentData.data[0].url,
      orderRef: orderRef
    });

  } catch (error: any) {
    console.error('Complete error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

