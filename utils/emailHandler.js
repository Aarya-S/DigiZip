import nodemailer from 'nodemailer';
export default async function sendEmail(des) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    var mailOptions = {
        from: process.env.EMAIL,
        to: des.email,
        subject: des.title,
        html: `<div style={{paddingLeft:'20vw', paddingTop:'10vh'}}>
        <br/><br/>Hi <b>${des.email.split('@')[0]},</b><br/><br/>
        ${des.description} <br/>
        </div>` 
    };
    try {
        //VALIDATION OF USER INPUTS
        transporter.sendMail(mailOptions, async function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            // const { error } = await registerSchema.validateAsync(req.body);
        
            // if (error) {
            //   res.status(400).send(error.details[0].message);
            // }  else {
            // }
          }
        });
    } catch (error) {
        console.log(error);
    }
}