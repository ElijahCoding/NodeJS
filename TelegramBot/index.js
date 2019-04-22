const TelegramBot = require('node-telegram-bot-api')
const token = '862902378:AAFBRG6BFdo6C4qJgXCcMTxlRgCBKGZmLk4'

const bot = new TelegramBot(token, {
    polling: true
})

bot.on('message', (msg) => {
    console.log(msg)
    bot.sendMessage(msg.chat.id, 'Hi')
})
