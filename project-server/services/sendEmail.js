const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: '36213814973@mby.co.il',
        pass: 'Student@264'
    }
});

// function sendEmail(to, subject, body) {
//     const mailOptions = {
//         from: '36213814973@mby.co.il',
//         to: to,
//         subject: subject,
//         text: body
//     };
//     return transporter.sendMail(mailOptions);
// }

async function sendEmailWithAttachment(to,subject,body,fileName,path) {
    let mailOptions = {
        from: '36213814973@mby.co.il',
        to: to,
        subject: subject,
        text: 'Please see the attached file. '+body,
        attachments: [
            {
                filename: fileName,
                path: path
            }
        ]
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
}

// sendEmail,
module.exports = {sendEmailWithAttachment};