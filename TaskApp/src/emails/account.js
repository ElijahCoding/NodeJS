const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'cuiyeqing960904@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'cuiyeqing960904@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
