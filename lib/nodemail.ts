import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST as string,
  port: process.env.MAIL_PORT as unknown as number,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


// send email 
export const sendEmail = async (to: string, subject:string, html: string) => {
    const mailOptions = {
        from : process.env.MAIL_USER as string,
        to : to,
        subject : subject,
        html : html
    };
    
    try{
        await transporter.sendMail(mailOptions);
    }
    
    catch(error){
        console.error(error);
    }
}


export default transporter;
