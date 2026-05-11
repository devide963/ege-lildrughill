import { useEffect, useState } from "react"
import { supabase } from "../supabase"

export function useExam(userId) {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(30 * 60)
  const [finished, setFinished] = useState(false)

  // загрузка вопросов
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("questions")
        .select("*")
        .eq("part", 1)

      setQuestions(data || [])
    }

    load()
  }, [])

  // таймер
  useEffect(() => {
    if (finished) return

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setFinished(true)
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [finished])

  function answerQuestion(value) {
    const q = questions[current]

    setAnswers({
      ...answers,
      [q.id]: value
    })
  }

  async function finishExam() {
    setFinished(true)

    await supabase.from("exam_state").upsert({
      user_id: userId,
      part: 1,
      finished_at: new Date()
    })
  }

  return {
    questions,
    current,
    setCurrent,
    answers,
    answerQuestion,
    timeLeft,
    finished,
    finishExam
  }
}
