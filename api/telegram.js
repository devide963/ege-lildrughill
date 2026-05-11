export default async function handler(req, res) {
  const body = req.body

  // сюда Telegram будет слать апдейты
  console.log(body)

  return res.status(200).json({ ok: true })
}
