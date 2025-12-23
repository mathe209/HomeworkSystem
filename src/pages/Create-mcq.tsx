import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

import Navbar from "../components/navbar";

const API_BASE = "http://localhost:3000";

//function that resets the token upon logging out
function resetToken(){
    localStorage.token = null;
    window.location.href = '/';
}
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
  const {me, loading} = useAuth()
  if (loading) return <div>loading...</div>

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
    <>
    <Navbar/>
    <div className="mt-15 mx-10">
      <strong>{me ? `Signed in as: ${me.name}` : "Not signed in"}</strong>
    </div>
    <div className="mt-1 mx-10">
      <h2 className="text-lg font-bold">Create MCQ</h2>
      <p>Homework ID: {homeworkId}</p>

      <form onSubmit={handleSubmit}>
        <div className="p-2 rounded border border-black">
          <label>Question</label>
          <input value={question} onChange={(e) => setQuestion(e.target.value)} required className="bg-gray-200 w-full text-white"/>
        </div>

        <div className="p-2 mt-3 mx-auto rounded border border-black">
          <label>Option A</label>
          <input value={optionA} onChange={(e) => setOptionA(e.target.value)} required  className="bg-gray-200 w-full text-white"/>
        </div>
2        <div className="p-2 mt-3 mx-auto rounded border border-black">
          <label>Option B</label>
          <input value={optionB} onChange={(e) => setOptionB(e.target.value)} required  className="bg-gray-200 w-full text-white"/>
        </div>

        <div className="p-2 mt-3 mx-auto rounded border border-black">
          <label>Option C</label>
          <input value={optionC} onChange={(e) => setOptionC(e.target.value)} required  className="bg-gray-200 w-full text-white"/>
        </div>

        <div className="p-2 mt-3 mx-auto rounded border border-black">
          <label>Option D</label>
          <input value={optionD} onChange={(e) => setOptionD(e.target.value)} required  className="bg-gray-200 w-full text-white"/>
        </div>

        <div className="p-2 mt-2 mx-auto rounded border border-black">
          <label>Option E (optional)</label>
          <input value={optionE} onChange={(e) => setOptionE(e.target.value)}  className="bg-gray-200 w-full text-white"/>
        </div>

        <div className="p-2 mt-3 mx-auto rounded border border-black">
          <label className="me-3">Correct Option</label>
          <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value as any)}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-green-500 border-blue-500 rounded-lg p-3">
          {isSubmitting ? "Saving..." : "Save MCQ"}
        </button>

        <button
          type="button"
          className="bg-blue-500 border-blue-500 rounded-lg p-3"
          onClick={() => navigate("/manageHomeworks")}
        >
          Done / Manage Homeworks
        </button>
        <button className="bg-red-500 border-blue-500 rounded-lg p-3" onClick={()=>resetToken()}>
            Log Out
        </button>
      </form>
    </div>
    </>
  );
}