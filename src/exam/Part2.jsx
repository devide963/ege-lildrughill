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
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Часть 2</h2>

        <p style={styles.text}>
          Напишите развернутый ответ
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
          placeholder="Введите ответ..."
        />

        <button
          onClick={submit}
          disabled={!text || sent}
          style={styles.primaryBtn}
        >
          {sent ? "Отправлено" : "Отправить на проверку"}
        </button>
      </div>
    </div>
  )
}

// -------------------------
const styles = {
  page: {
    fontFamily: "Inter, sans-serif",
    background: "#0000",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },

  card: {
    width: "100%",
    maxWidth: 420,
    background: "white",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },

  title: {
    color: "#1e88e5",
    marginBottom: 10
  },

  text: {
    color: "#555",
    marginBottom: 10
  },

  textarea: {
    width: "100%",
    height: 180,
    padding: 12,
    borderRadius: 12,
    border: "1px solid #ddd",
    marginBottom: 12
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: "#1e88e5",
    color: "white",
    fontWeight: 600
  }
}
