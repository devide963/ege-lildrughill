import { useEffect, useState } from "react"
import { useExam } from "./exam/useExam"

export default function App() {
  const [tg, setTg] = useState(null)
  const [user, setUser] = useState(null)
  const [step, setStep] = useState("loading")
  const [error, setError] = useState("")

  const exam = useExam(user?.id || "guest")

  // -------------------------
  // INIT TELEGRAM
  // -------------------------
  useEffect(() => {
    const telegram = window.Telegram?.WebApp

    if (telegram) {
      telegram.ready()
      telegram.expand()

      setTg(telegram)
      setUser(telegram.initDataUnsafe?.user || null)
    } else {
      setTg(null)
      setUser(null)
    }
  }, [])

  // -------------------------
  // CHECK SUB ON LOAD
  // -------------------------
  useEffect(() => {
    if (user) {
      checkSubscription(user.id)
    } else {
      setStep("subscribe")
    }
  }, [user])

  async function checkSubscription(userId) {
    try {
      setError("")

      const res = await fetch(
        `/api/check-sub?userId=${userId}`
      )

      const data = await res.json()

      if (data.subscribed) {
        setStep("exam")
      } else {
        setStep("subscribe")
        setError("Вы не подписаны на канал")
      }
    } catch (e) {
      console.log(e)
      setStep("subscribe")
      setError("Ошибка проверки подписки")
    }
  }

  // -------------------------
  // LOADING
  // -------------------------
  if (step === "loading") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <p>Загрузка...</p>
        </div>
      </div>
    )
  }

  // -------------------------
  // SUBSCRIBE SCREEN
  // -------------------------
  if (step === "subscribe") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>
            ЕГЭ LILDRUGHILL
          </h1>

          <p style={styles.text}>
            Подпишитесь на канал для доступа
          </p>

          <a
            href="https://t.me/lildrughillarmy"
            target="_blank"
          >
            <button style={styles.btn}>
              Подписаться
            </button>
          </a>

          <button
            onClick={() =>
              checkSubscription(user?.id)
            }
            style={styles.btnOutline}
          >
            Я подписался
          </button>

          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}
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
        <h3>
          Вопрос {exam.current + 1}/
          {exam.questions.length}
        </h3>

        {!q ? (
          <p>Загрузка...</p>
        ) : (
          <>
            <p>{q.question}</p>

            {q.type === "mcq" &&
              q.options.map((o, i) => (
                <button
                  key={i}
                  onClick={() =>
                    exam.answerQuestion(o)
                  }
                  style={styles.option}
                >
                  {o}
                </button>
              ))}

            {q.type === "text" && (
              <input
                onChange={(e) =>
                  exam.answerQuestion(
                    e.target.value
                  )
                }
                style={styles.input}
              />
            )}

            <button
              onClick={() =>
                exam.nextQuestion()
              }
              style={styles.btn}
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
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6ff",
    fontFamily: "sans-serif"
  },

  card: {
    width: 360,
    background: "white",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  title: {
    color: "#4f46e5"
  },

  text: {
    marginBottom: 10
  },

  btn: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 10
  },

  btnOutline: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    border: "1px solid #4f46e5",
    background: "white",
    color: "#4f46e5",
    borderRadius: 10
  },

  option: {
    width: "100%",
    padding: 10,
    marginTop: 6,
    border: "1px solid #ddd",
    borderRadius: 8,
    background: "white"
  },

  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    border: "1px solid #ddd",
    borderRadius: 8
  }
}
