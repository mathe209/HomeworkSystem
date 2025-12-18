import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:3000";

export default function CreateMcqPage() {
  const navigate = useNavigate();
  const { homeworkId } = useParams(); // comes from /create-mcq/:homeworkId

  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [optionE, setOptionE] = useState("");
  const [correctOption, setCorrectOption] = useState<"A" | "B" | "C" | "D" | "E">("A");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!homeworkId) {
      alert("Missing homeworkId in URL");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in.");
      navigate("/LogTeacherIn");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        optionE: optionE || null,
        correctOption,
        homeworkId: Number(homeworkId),
      };

      await axios.post(`${API_BASE}/homework/mcq`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Stay on same page -> add another MCQ
      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setOptionE("");
      setCorrectOption("A");

      alert("MCQ saved. Add another one.");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message ?? "Failed to save MCQ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h2>Create MCQ</h2>
      <p>Homework ID: {homeworkId}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Question</label>
          <input value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </div>

        <div>
          <label>Option A</label>
          <input value={optionA} onChange={(e) => setOptionA(e.target.value)} required />
        </div>

        <div>
          <label>Option B</label>
          <input value={optionB} onChange={(e) => setOptionB(e.target.value)} required />
        </div>

        <div>
          <label>Option C</label>
          <input value={optionC} onChange={(e) => setOptionC(e.target.value)} required />
        </div>

        <div>
          <label>Option D</label>
          <input value={optionD} onChange={(e) => setOptionD(e.target.value)} required />
        </div>

        <div>
          <label>Option E (optional)</label>
          <input value={optionE} onChange={(e) => setOptionE(e.target.value)} />
        </div>

        <div>
          <label>Correct Option</label>
          <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value as any)}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save MCQ"}
        </button>

        <button
          type="button"
          style={{ marginLeft: 12 }}
          onClick={() => navigate("/manage-homeworks")}
        >
          Done / Manage Homeworks
        </button>
      </form>
    </div>
  );
}