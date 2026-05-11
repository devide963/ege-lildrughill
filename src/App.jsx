import { useEffect, useState } from "react"

export default function App() {
  const [debug, setDebug] = useState({})

  useEffect(() => {
    setDebug({
      hasWindow: !!window,
      hasTelegram: !!window.Telegram,
      webApp: window.Telegram?.WebApp || null,
      initData: window.Telegram?.WebApp?.initData || null,
      initDataUnsafe: window.Telegram?.WebApp?.initDataUnsafe || null
    })
  }, [])

  return (
    <div style={{ padding: 20, whiteSpace: "pre-wrap" }}>
      <h2>DEBUG INFO</h2>
      <pre>{JSON.stringify(debug, null, 2)}</pre>
    </div>
  )
}
