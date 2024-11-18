import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
      toEmail,
      subject,
      text,
      fileAttachment = [],
      html = ""
    } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    let mailOptions = {
      from: email,
      to: toEmail,
      subject: subject,
      text: text,
    } as import('nodemailer').SendMailOptions;

    if (fileAttachment.length > 0) {
      mailOptions.attachments = fileAttachment.map((file: { filename: any; content: any; encoding: any; }) => ({
        filename: file.filename,
        content: file.content,
        encoding: file.encoding,
      }));
    }
    if(html?.length > 0){
      mailOptions.html =  html;
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (isError(error)) {
      console.error("Error sending email:", error.message);
      return NextResponse.json(
        { message: "Failed to send email", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Error sending email: Unknown error");
      return NextResponse.json(
        { message: "Failed to send email", error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
