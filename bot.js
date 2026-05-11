import TelegramBot from "node-telegram-bot-api"

const token = process.env.BOT_TOKEN
const webAppUrl = "https://ege-lildrughill-16ql.vercel.app"

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id

  bot.sendMessage(chatId, "Открой экзамен 👇", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "🚀 Открыть экзамен",
            web_app: { url: webAppUrl }
          }
        ]
      ],
      resize_keyboard: true
    }
  })
})
