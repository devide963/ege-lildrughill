import { useState } from "react"
import { useExam } from "./exam/useExam"
import Part2 from "./exam/Part2"

export default function App() {
  const userId = "test-user"

  const exam = useExam(userId)

  const [step, setStep] = useState("subscribe")
  const [part2Done, setPart2Done] = useState(false)

  // -------------------------
  // ПОДПИСКА
  // -------------------------
  if (step === "subscribe") {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>ЕГЭ ПО LILDRUGHILL</h1>

        <p>Подпишитесь на канал, чтобы начать экзамен</p>

        <a
          href="https://t.me/lildrughillarmy"
          target="_blank"
          style={styles.buttonPrimary}
        >
          Подписаться
        </a>

        <button
          onClick={() => setStep("exam")}
          style={styles.button}
        >
          Я подписался
        </button>
      </div>
    )
  }

  // -------------------------
  // 1 ЧАСТЬ ЭКЗАМЕНА
  // -------------------------
  if (step === "exam") {
    if (exam.finished && !part2Done) {
      return (
        <Part2
          userId={userId}
          onFinish={() => {
            setPart2Done(true)
            setStep("miike")
          }}
        />
      )
    }

    const q = exam.questions[exam.current]

    return (
      <div style={styles.container}>
        <h3>
          Время: {Math.floor(exam.timeLeft / 60)}:
          {String(exam.timeLeft % 60).padStart(2, "0")}
        </h3>

        {q ? (
          <div>
            <p style={{ fontSize: 18 }}>{q.question}</p>

            {/* варианты */}
            {q.type === "mcq" &&
              q.options?.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => exam.answerQuestion(opt)}
                  style={styles.option}
                >
                  {opt}
                </button>
              ))}

            {/* текст */}
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
                }
              }}
              style={styles.buttonPrimary}
            >
              Далее
            </button>
          </div>
        ) : (
          <p>Загрузка...</p>
        )}
      </div>
    )
  }

  // -------------------------
  // MIKE экран
  // -------------------------
  if (step === "miike") {
    return (
      <div style={styles.container}>
        <h1>MIKE</h1>

        <button
          onClick={() => setStep("result")}
          style={styles.buttonPrimary}
        >
          Результаты
        </button>
      </div>
    )
  }

  // -------------------------
  // РЕЗУЛЬТАТЫ
  // -------------------------
  if (step === "result") {
    return (
      <div style={styles.container}>
        <h2>Результаты</h2>
        <p>Ожидает проверки администратора</p>
      </div>
    )
  }

  return null
}

// -------------------------
const styles = {
  container: {
    fontFamily: "sans-serif",
    background: "#f5f9ff",
    height: "100vh",
    padding: 20
  },
  title: {
    color: "#1e88e5"
  },
  button: {
    marginTop: 10,
    padding: 12,
    width: "100%"
  },
  buttonPrimary: {
    display: "block",
    padding: 12,
    background: "#1e88e5",
    color: "white",
    borderRadius: 10,
    textAlign: "center",
    marginTop: 10,
    textDecoration: "none",
    border: "none"
  },
  option: {
    display: "block",
    margin: 5,
    padding: 10,
    width: "100%"
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 10
  }
}
