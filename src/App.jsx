import { useState } from "react"

export default function App() {
  const [step, setStep] = useState("subscribe")

  return (
    <div style={{
      fontFamily: "sans-serif",
      background: "#f5f9ff",
      height: "100vh",
      padding: 20
    }}>
      
      {step === "subscribe" && (
        <div>
          <h1>ЕГЭ ПО LILDRUGHILL</h1>
          <p>Подпишитесь на канал, чтобы начать экзамен</p>

          <a
            href="https://t.me/lildrughillarmy"
            target="_blank"
            style={{
              display: "block",
              padding: 12,
              background: "#1e88e5",
              color: "white",
              borderRadius: 10,
              textAlign: "center",
              marginTop: 10
            }}
          >
            Подписаться
          </a>

          <button
            onClick={() => setStep("exam")}
            style={{
              marginTop: 10,
              width: "100%",
              padding: 12
            }}
          >
            Я подписался
          </button>
        </div>
      )}

      {step === "exam" && (
        <div>
          <h2>Экзамен</h2>
          <p>Здесь будет тест (20 вопросов + таймер)</p>

          <button onClick={() => setStep("miike")}>
            Завершить тест
          </button>
        </div>
      )}

      {step === "miike" && (
        <div>
          <h1>MIKE</h1>
          <button onClick={() => setStep("result")}>
            Результаты
          </button>
        </div>
      )}

      {step === "result" && (
        <div>
          <h2>Результаты</h2>
          <p>Здесь будет админская проверка</p>
        </div>
      )}

    </div>
  )
}
