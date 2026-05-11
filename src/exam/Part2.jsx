import { useState } from "react"
import { supabase } from "../supabase"

export default function Part2({ userId, onFinish }) {
  const [text, setText] = useState("")
  const [sent, setSent] = useState(false)

  async function submit() {
    setSent(true)

    await supabase
      .from("users")
      .update({
        part2_text: text,
        status: "pending"
      })
      .eq("id", userId)

    onFinish()
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Часть 2</h2>

      <p>Напиши развернутый ответ:</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          height: 200,
          padding: 10
        }}
        placeholder="Введите ответ..."
      />

      <button
        onClick={submit}
        disabled={!text || sent}
        style={{
          marginTop: 10,
          padding: 12,
          width: "100%",
          background: "#1e88e5",
          color: "white",
          border: "none",
          borderRadius: 8
        }}
      >
        {sent ? "Отправлено" : "Отправить на проверку"}
      </button>
    </div>
  )
}
