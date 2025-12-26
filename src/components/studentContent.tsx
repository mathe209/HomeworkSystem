import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import axios from "axios";

type AnswerMap = Record<number, string>;

type Grade = {
  score: number;
  correct: number;
  total: number;
};

export default function StudentContent() {
  const { me, loading } = useAuth();

  const subjects = ["Math", "Science", "History"];

  const [homeworkId, setHomeworkId] = useState("");
  const [mcqs, setMcqs] = useState<any[]>([]);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [grade, setGrade] = useState<Grade | null>(null);

  async function handleViewHomework(subject: string) {
    setActiveSubject(subject);
    setError("");
    setMcqs([]);
    setAnswers({});
    setSubmitted(false);
    setGrade(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/homework/${homeworkId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];

      const subjectMcqs = data.filter(
        (mcq) =>
          mcq?.homework?.subject?.toLowerCase() === subject.toLowerCase()
      );

      if (subjectMcqs.length === 0) {
        setError(`No ${subject} homework found`);
        return;
      }

      setMcqs(subjectMcqs);
    } catch (err) {
      console.error(err);
      setError("Failed to load homework");
    }
  }

  function handleAnswerChange(mcqId: number, option: string) {
    setAnswers((prev) => ({
      ...prev,
      [mcqId]: option,
    }));
  }

    async function handleSubmitHomework() {
        try {
            const payload = {
                homeworkId: Number(homeworkId),
                answers: Object.entries(answers).map(([mcqId, answer]) => ({
                    mcqId: Number(mcqId),
                    answer,
                })),
            };

            const res = await axios.post(
                "http://localhost:3000/homework/submit",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // ✅ success
            setGrade(res.data);
            setSubmitted(true);
            setError("");
        } catch (err: any) {
            console.error(err);

            // 🔴 BACKEND MESSAGE
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to submit homework");
            }
        }
    }

  if (loading) return <div>loading...</div>;

  return (
    <div className="p-6 border rounded shadow-md mt-10 mx-10">
      <section className="mb-4">
        Logged in as: {me?.name}, {me?.role}
        {me?.role === "student" ? `, Grade: ${me?.grade}` : ""}
      </section>

      <h1 className="text-xl font-bold mb-4">Your Subjects</h1>

      <input
        type="text"
        placeholder="Enter Homework ID"
        value={homeworkId}
        onChange={(e) => setHomeworkId(e.target.value)}
        className="border px-2 py-1 mb-4 block"
        required
      />

      <div className="grid grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <div key={subject} className="border p-4 rounded">
            <h3 className="font-bold mb-2">{subject}</h3>

            <button
              onClick={() => handleViewHomework(subject)}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              View {subject} Homework
            </button>

            {error && activeSubject === subject && (
              <p className="text-red-500 mt-2">{error}</p>
            )}

            {activeSubject === subject &&
              mcqs.map((mcq) => (
                <div key={mcq.id} className="mt-4 border-l pl-4">
                  <p className="font-semibold mb-2">Q: {mcq.question}</p>

                  {["A", "B", "C", "D", "E"].map((opt) => {
                    const value = mcq[`option${opt}`];
                    if (!value) return null;

                    return (
                      <label key={opt} className="block mb-1">
                        <input
                          type="radio"
                          name={`mcq-${mcq.id}`}
                          checked={answers[mcq.id] === opt}
                          onChange={() =>
                            handleAnswerChange(mcq.id, opt)
                          }
                          className="mr-2"
                        />
                        {opt}: {value}
                      </label>
                    );
                  })}
                </div>
              ))}

            {activeSubject === subject &&
              mcqs.length > 0 &&
              !submitted && (
                <button
                    onClick={handleSubmitHomework}
                    disabled={submitted}
                    className={`mt-4 px-4 py-2 rounded text-white ${
                        submitted ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
                    }`}
                >
                    Submit Homework
                </button>
              )}
          </div>
        ))}
      </div>

      {grade && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-lg font-bold mb-2">Your Grade</h2>
          <p>
            You scored {grade.score} / {grade.total} (
            {((grade.score / grade.total) * 100).toFixed(2)}%)
          </p>
          <p>Correct answers: {grade.correct}</p>
        </div>
      )}
    </div>
  );
}
