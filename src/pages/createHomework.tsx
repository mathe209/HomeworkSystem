import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

export default function CreateHomeworkPage() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("math");
  const [timeStamp, setTimeStamp] = useState(""); // "YYYY-MM-DD"
  const [answerOne, setAnswerOne] = useState("");
  const [answerTwo, setAnswerTwo] = useState("");
  const [answerThree, setAnswerThree] = useState("");
  const [answerFour, setAnswerFour] = useState("");
  const [answerFive, setAnswerFive] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in.");
      navigate("/LogTeacherIn");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        subject,
        timeStamp,
        AnswerOne: answerOne,
        AnswerTwo: answerTwo,
        AnswerThree: answerThree,
        AnswerFour: answerFour,
        AnswerFive: answerFive,
      };

      const res = await axios.post(`${API_BASE}/homework`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // backend returns the created homework row, including its id
      const createdHomework = res.data;
      console.log("Created homework:", createdHomework);

      // Next step: go create MCQs for this homework
      navigate(`/create-mcq/${createdHomework.id}`);
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message ?? "Failed to create homework");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Create Homework</h2>

      <form onSubmit={handleSubmit}>
        <label>Subject</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="literature">Literature</option>
        </select>

        <br /><br />

        <label>Due Date</label>
        <input
          type="date"
          value={timeStamp}
          onChange={(e) => setTimeStamp(e.target.value)}
          required
        />

        <br /><br />

        <label>Answer 1</label>
        <input value={answerOne} onChange={(e) => setAnswerOne(e.target.value)} required />

        <br /><br />

        <label>Answer 2</label>
        <input value={answerTwo} onChange={(e) => setAnswerTwo(e.target.value)} required />

        <br /><br />

        <label>Answer 3</label>
        <input value={answerThree} onChange={(e) => setAnswerThree(e.target.value)} required />

        <br /><br />

        <label>Answer 4</label>
        <input value={answerFour} onChange={(e) => setAnswerFour(e.target.value)} required />

        <br /><br />

        <label>Answer 5</label>
        <input value={answerFive} onChange={(e) => setAnswerFive(e.target.value)} required />

        <br /><br />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Submit Homework"}
        </button>
      </form>
    </div>
  );
}