declare module "nodemailer" {
  export interface Transporter {
    sendMail(mailOptions: any): Promise<any>;
  }
  export function createTransport(transport?: any, defaults?: any): Transporter;
}
