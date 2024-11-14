import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phoneNumber, message } =
      await request.json();

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

    const mailOptions = {
      from: email,
      to: [
        "aadilyusuf99@gmail.com",
        "ateeqasif1168@gmail.com",
        "alizaman8383@gmail.com",
        "support@zeeinvoices.com",
        "u.raufshahzad@gmail.com",
      ],
      subject: `Contact Us Form Submission from ${firstName} ${lastName}`,
      text: `You have a new message from the Contact Us form:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nMessage: ${message}`,
    };

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
