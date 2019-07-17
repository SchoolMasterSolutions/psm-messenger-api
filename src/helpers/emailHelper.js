import mailer from "nodemailer";

export const sendEmail = (options, res) => {
    mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wil.kiggundu@gmail.com',
            pass: 'sw33th0m3'
        }
    }).sendMail(options, (error, info) => {
        if (error) {
            return res.status(400).send({success: false, error: error})
        } else {
            return res.status(200).send({success: true, info: info});
        }
    });
}