import { useEffect, useState } from "react"
import { supabase } from "../supabase"

export function useExam(userId) {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(30 * 60)
  const [finished, setFinished] = useState(false)

  // -------------------------
  // загрузка вопросов
  // -------------------------
  useEffect(() => {
    async function loadQuestions() {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("part", 1)

      if (!error) setQuestions(data || [])
    }

    loadQuestions()
  }, [])

  // -------------------------
  // таймер 30 минут
  // -------------------------
  useEffect(() => {
    if (finished) return

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setFinished(true)
          finishExam()
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [finished])

  // -------------------------
  // ответ на вопрос
  // -------------------------
  function answerQuestion(value) {
    const q = questions[current]
    if (!q) return

    setAnswers((prev) => ({
      ...prev,
      [q.id]: value
    }))
  }

  // -------------------------
  // завершение экзамена
  // -------------------------
  async function finishExam() {
    setFinished(true)

    const score = Object.keys(answers).length

    await supabase.from("users").upsert({
      id: userId,
      score_part1: score,
      has_passed: true,
      status: "pending"
    })

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
