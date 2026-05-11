export default async function handler(req, res) {
  const { userId } = req.query

  const botToken = process.env.BOT_TOKEN
  const channel = "@lildrughillarmy"

  if (!userId) {
    return res.json({ subscribed: false })
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${channel}&user_id=${userId}`
    )

    const data = await response.json()

    const status = data.result?.status

    const isMember =
      status === "member" ||
      status === "administrator" ||
      status === "creator"

    return res.json({ subscribed: isMember })
  } catch (e) {
    return res.json({ subscribed: false })
  }
}
