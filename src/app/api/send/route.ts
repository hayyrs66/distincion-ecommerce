process.loadEnvFile();
import { EmailTemplate } from "@/app/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Distinción <onboarding@resend.dev>",
      to: ["rayrtsx@proton.me"],
      subject: "Compra en línea",
      react: EmailTemplate({ firstName: "Daniel" }),
      text: "",
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
      console.log(error)
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
