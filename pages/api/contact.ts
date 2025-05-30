import nodemailer from 'nodemailer'

export default async function contact (req, res) {
  
    const {name, email, msg} = req.body

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_USER_EMAIL,
            pass: process.env.NEXT_USER_PASS
        }
    });

    try {
        await transporter.sendMail({
          from: email,
          to: 'billsssp@gmail.com',
          subject: `[Portofolio] Contact form submission from ${email}`,
          html: `<p>You have a new contact form submission</p><br>
          <p><strong>Name: </strong> ${name} </p><br>
          <p><strong>Message: </strong> ${msg} </p><br>
          `,
        });

      } catch (err) {
        console.log(err.message);
      }

    res.status(200).json(req.body)
  
}