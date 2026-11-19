import nodemailer from "nodemailer";
import { config } from "../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arifulislamofficial26@gmail.com",
    pass: config.smtp_pass,
  },
});

export const sendForgetPasswordEmail = async (
  receiverEmail: string,
  subject: string,
  receiverName: string,
  resetPasswordLink: string,
) => {
  try {
    const info = await transporter.sendMail({
      from: "arifulislamofficial26@gmail.com",
      to: receiverEmail,
      subject: subject,
      html: `
<div style="margin:0; padding:30px 15px; background-color:#f4f6f8; font-family:Arial,Helvetica,sans-serif;">

  <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">

    <!-- Header -->
    <div style="padding:25px 30px; text-align:center; background-color:#111827;">
      <h1 style="margin:0; color:#ffffff; font-size:25px; font-weight:700; letter-spacing:1px;">
        Chaity E-commerce
      </h1>
      <p style="margin:8px 0 0; color:#d1d5db; font-size:12px;">
        Your Shopping Destination
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding:35px 30px;">

      <h2 style="margin:0 0 20px; color:#111827; font-size:23px; font-weight:700;">
        Reset Your Password
      </h2>

      <p style="margin:0 0 15px; color:#374151; font-size:15px; line-height:1.8;">
        Hello <strong>${receiverName || "Dear User"}</strong>,
      </p>

      <p style="margin:0 0 18px; color:#4b5563; font-size:14px; line-height:1.8;">
        We received a request to reset the password associated with your account. If you made this request, click the button below to create a new password.
      </p>

      <!-- Reset Button -->
      <div style="text-align:center; margin:30px 0;">
        <a href="${resetPasswordLink}"
           target="_blank"
           style="display:inline-block; padding:15px 35px; background-color:#2563eb; color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; border-radius:6px;">
          Reset My Password
        </a>
      </div>

      <!-- Expiration Notice -->
      <div style="padding:15px 18px; margin:25px 0; background-color:#eff6ff; border-left:4px solid #2563eb; border-radius:4px;">
        <p style="margin:0; color:#1e40af; font-size:13px; line-height:1.7;">
          <strong>Important:</strong> This password reset link will expire in <strong>15 minutes</strong> for security reasons.
        </p>
      </div>

      <!-- Fallback Link -->
      <p style="margin:20px 0 8px; color:#4b5563; font-size:13px; line-height:1.7;">
        If the button above doesn't work, copy and paste the following link into your browser:
      </p>

      <p style="margin:0 0 22px; padding:12px; background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:5px; font-size:12px; line-height:1.7; word-break:break-all;">
        <a href="${resetPasswordLink}" style="color:#2563eb; text-decoration:underline;">
          ${resetPasswordLink}
        </a>
      </p>

      <!-- Security Notice -->
      <div style="margin-top:25px;">
        <h3 style="margin:0 0 10px; color:#111827; font-size:15px;">
          Didn't Request a Password Reset?
        </h3>

        <p style="margin:0 0 18px; color:#6b7280; font-size:13px; line-height:1.8;">
          No worries! Your account is still secure. You can safely ignore this email. Your password will remain unchanged unless you use the reset link above.
        </p>

        <p style="margin:0; color:#6b7280; font-size:13px; line-height:1.8;">
          For your security, never share this password reset link with anyone. Our team will never ask you for your password or reset token.
        </p>
      </div>

      <!-- Sign-off -->
      <div style="margin-top:30px; padding-top:20px; border-top:1px solid #e5e7eb;">
        <p style="margin:0; color:#374151; font-size:14px; line-height:1.8;">
          Best regards,<br />
          <strong>Chaity E-commerce Security Team</strong>
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="padding:22px 30px; background-color:#f9fafb; border-top:1px solid #e5e7eb; text-align:center;">

      <p style="margin:0 0 10px; color:#374151; font-size:13px; font-weight:600;">
        Chaity E-commerce
      </p>

      <p style="margin:0 0 12px; color:#9ca3af; font-size:12px; line-height:1.7;">
        Secure shopping. Trusted experience.
      </p>

      <p style="margin:0 0 12px; font-size:12px;">
        <a href="https://chaity.com" style="color:#2563eb; text-decoration:none;">
          Visit Website
        </a>
        &nbsp;|&nbsp;
        <a href="mailto:support@chaity.com" style="color:#2563eb; text-decoration:none;">
          Contact Support
        </a>
      </p>

      <p style="margin:0; color:#9ca3af; font-size:11px; line-height:1.6;">
        © 2026 Chaity E-commerce. All rights reserved.<br />
        This is an automated security notification. Please do not reply to this email.
      </p>

    </div>

  </div>

</div>
`,
    });

    console.log("Sent to your inbox! ID:", info.messageId);
  } catch (error) {
    console.log(error);
  }
};

// export async function sendToMyself() {
//   const info = await transporter.sendMail({
//     from: "arifulislamofficial26@gmail.com",
//     to: "sojibhossain.cse@gmail.com",
//     subject: "Real Inbox HTML Test",
//     html: `
// <div style="margin:0; padding:30px 15px; background-color:#f4f6f8; font-family:Arial,Helvetica,sans-serif;">

//   <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">

//     <!-- Brand Header -->
//     <div style="padding:25px 30px; text-align:center; background-color:#111827;">
//       <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:700; letter-spacing:1px;">
//         YOUR STORE
//       </h1>
//       <p style="margin:8px 0 0; color:#d1d5db; font-size:12px;">
//         Your Style. Your Choice. Your Experience.
//       </p>
//     </div>

//     <!-- Main Content -->
//     <div style="padding:35px 30px;">

//       <h2 style="margin:0 0 18px; color:#111827; font-size:23px; font-weight:700;">
//         Welcome to Our Store!
//       </h2>

//       <p style="margin:0 0 16px; color:#4b5563; font-size:15px; line-height:1.8;">
//         Hello <strong>Customer</strong>,
//       </p>

//       <p style="margin:0 0 16px; color:#4b5563; font-size:15px; line-height:1.8;">
//         Thank you for choosing <strong>YOUR STORE</strong>. We're delighted to have you as part of our growing community!
//       </p>

//       <p style="margin:0 0 22px; color:#4b5563; font-size:15px; line-height:1.8;">
//         Discover a wide range of quality products, enjoy a smooth shopping experience, and find everything you need in one place. We're committed to making your shopping journey simple, secure, and enjoyable.
//       </p>

//       <!-- CTA Button -->
//       <div style="text-align:center; margin:30px 0;">
//         <a href="https://yourstore.com"
//            target="_blank"
//            style="display:inline-block; padding:14px 32px; background-color:#2563eb; color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; border-radius:6px;">
//           Start Shopping
//         </a>
//       </div>

//       <!-- Benefits -->
//       <div style="margin:30px 0; padding:20px; background-color:#f9fafb; border-radius:6px;">
//         <h3 style="margin:0 0 15px; color:#111827; font-size:16px;">
//           Why Shop With Us?
//         </h3>

//         <p style="margin:8px 0; color:#4b5563; font-size:14px; line-height:1.7;">
//           ✓ Carefully selected quality products
//         </p>
//         <p style="margin:8px 0; color:#4b5563; font-size:14px; line-height:1.7;">
//           ✓ Secure and convenient payment options
//         </p>
//         <p style="margin:8px 0; color:#4b5563; font-size:14px; line-height:1.7;">
//           ✓ Reliable delivery service
//         </p>
//         <p style="margin:8px 0; color:#4b5563; font-size:14px; line-height:1.7;">
//           ✓ Dedicated customer support
//         </p>
//       </div>

//       <p style="margin:0 0 16px; color:#4b5563; font-size:14px; line-height:1.8;">
//         Have questions or need assistance? Our support team is always happy to help.
//       </p>

//       <p style="margin:0; color:#374151; font-size:14px; line-height:1.8;">
//         Best regards,<br />
//         <strong>YOUR STORE Team</strong>
//       </p>

//     </div>

//     <!-- Footer -->
//     <div style="padding:25px 30px; background-color:#f9fafb; border-top:1px solid #e5e7eb; text-align:center;">

//       <p style="margin:0 0 12px; color:#374151; font-size:13px; font-weight:600;">
//         YOUR STORE
//       </p>

//       <p style="margin:0 0 12px; color:#6b7280; font-size:12px; line-height:1.7;">
//         Making your online shopping experience better, every day.
//       </p>

//       <p style="margin:0 0 12px; font-size:12px;">
//         <a href="https://yourstore.com" style="color:#2563eb; text-decoration:none;">Website</a>
//         &nbsp;|&nbsp;
//         <a href="mailto:support@yourstore.com" style="color:#2563eb; text-decoration:none;">Contact Support</a>
//       </p>

//       <p style="margin:0; color:#9ca3af; font-size:11px; line-height:1.6;">
//         © 2026 YOUR STORE. All rights reserved.<br />
//         You are receiving this email because you registered with our store.
//       </p>

//     </div>

//   </div>

// </div>
// `,
//   });

//   console.log("Sent to your inbox! ID:", info.messageId);
// }
