import { useEffect, useState } from "react"

export default function App() {
  const tg = window.Telegram?.WebApp
  const tgUser = tg?.initDataUnsafe?.user

  const [result, setResult] = useState("Проверка...")

  useEffect(() => {
    check()
  }, [])

  async function check() {
    try {
      if (!tgUser) {
        setResult("Telegram user не найден")
        return
      }

      const userId = tgUser.id

      const res = await fetch(
        `/api/check-sub?userId=${userId}`
      )

      const data = await res.json()

      setResult(
        JSON.stringify(
          {
            telegramUser: tgUser,
            apiResponse: data
          },
          null,
          2
        )
      )
    } catch (e) {
      setResult(String(e))
    }
  }

  return (
    <div
      style={{
        padding: 20,
        color: "white",
        background: "black",
        minHeight: "100vh",
        whiteSpace: "pre-wrap"
      }}
    >
      {result}
    </div>
  )
}
