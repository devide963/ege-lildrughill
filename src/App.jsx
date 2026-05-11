import { useState } from "react"
import { useExam } from "./exam/useExam"

export default function App() {
  const userId = "test-user"
  const exam = useExam(userId)

  const [step, setStep] = useState("subscribe")

  // -------------------------
  // SUBSCRIBE SCREEN
  // -------------------------
  if (step === "subscribe") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>ЕГЭ ПО LILDRUGHILL</h1>

          <p style={styles.text}>
            Перед началом экзамена подпишитесь на канал
          </p>

          <a
            href="https://t.me/lildrughillarmy"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <button style={styles.primaryBtn}>
              Подписаться на канал
            </button>
          </a>

          <button
            onClick={() => setStep("exam")}
            style={styles.secondaryBtn}
          >
            Я подписался
          </button>
        </div>
      </div>
    )
  }

  // -------------------------
  // EXAM SCREEN
  // -------------------------
  const q = exam.questions?.[exam.current]

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topBar}>
          <span>Вопрос {exam.current + 1}</span>
          <span>
            {Math.floor(exam.timeLeft / 60)}:
            {String(exam.timeLeft % 60).padStart(2, "0")}
          </span>
        </div>

        {!q ? (
          <p>Загрузка...</p>
        ) : (
          <>
            <p style={styles.question}>{q.question}</p>

            {q.type === "mcq" &&
              q.options?.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => exam.answerQuestion(opt)}
                  style={styles.optionBtn}
                >
                  {opt}
                </button>
              ))}

            {q.type === "text" && (
              <input
                onChange={(e) => exam.answerQuestion(e.target.value)}
                style={styles.input}
                placeholder="Введите ответ"
              />
            )}

            <button
              onClick={() => {
                if (exam.current < exam.questions.length - 1) {
                  exam.setCurrent(exam.current + 1)
                } else {
                  exam.finishExam()
                  setStep("result")
                }
              }}
              style={styles.primaryBtn}
            >
              Далее
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// -------------------------
const styles = {
  page: {
    fontFamily: "Inter, sans-serif",
    background: "#f5f9ff",
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
    fontSize: 24,
    color: "#1e88e5",
    marginBottom: 10
  },

  text: {
    color: "#555",
    marginBottom: 16
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 16,
    fontWeight: 600,
    color: "#1e88e5"
  },

  question: {
    fontSize: 18,
    marginBottom: 16
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: "#1e88e5",
    color: "white",
    fontWeight: 600,
    marginTop: 12
  },

  secondaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "1px solid #1e88e5",
    background: "white",
    color: "#1e88e5",
    marginTop: 10
  },

  optionBtn: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#fff",
    textAlign: "left"
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    marginTop: 10
  }
}
