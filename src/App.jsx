import { useEffect, useState } from "react"

export default function App() {
  const [tgUser, setTgUser] = useState(null)
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    const tg = window.Telegram?.WebApp

    if (tg) {
      tg.ready()
      tg.expand()

      setTgUser(tg.initDataUnsafe?.user || null)
    } else {
      setTgUser(null)
    }
  }, [])

  useEffect(() => {
    if (!tgUser) {
      setStatus("no-telegram")
    } else {
      checkSub(tgUser.id)
    }
  }, [tgUser])

  async function checkSub(userId) {
    try {
      const res = await fetch(
        `/api/check-sub?userId=${userId}`
      )

      const data = await res.json()

      if (data.subscribed) {
        setStatus("ok")
      } else {
        setStatus("not-sub")
      }
    } catch (e) {
      setStatus("error")
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "no-telegram") {
    return <div>Open in Telegram</div>
  }

  if (status === "not-sub") {
    return (
      <div>
        Вы не подписаны
        <br />
        <a href="https://t.me/lildrughillarmy">
          Подписаться
        </a>
      </div>
    )
  }

  if (status === "ok") {
    return <div>Экзамен открыт</div>
  }

  return <div>Error</div>
}
