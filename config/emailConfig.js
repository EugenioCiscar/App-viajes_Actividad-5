const nodemailer = require('nodemailer');


class emailconfig {
    transporter(){
        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'ghnodemailer@gmail.com',
                pass: 'nodemailer'
            },
        }, {
                from: '',
                headers: {

                }
            })
    }
}



module.exports = emailconfig;