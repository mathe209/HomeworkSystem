import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Navbar from "../components/navbar";

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
  const {me, loading} = useAuth();
  if (loading) return <div>loading...</div>
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
    <>
    <Navbar/>
    <div className="mt-15 mx-5 sm:mx-10 md:mx-20 border border-black pb-10 p-5 rounded-lg bg-white shadow-md shadow-gray-600">
    <div className="mb-2 text-sm text-gray-600">
      <strong>{me ? `Signed in as: ${me.name}` : "Not signed in"}</strong>
    </div>
      <h2 className="text-2xl font-bold mb-4">Create Homework</h2>
      <hr className="mb-2"/>

      <form onSubmit={handleSubmit} className="p-3">
        <label className="">Subject:</label>
        <select className="border border-blue-500 mx-7" value={subject} onChange={(e) => setSubject(e.target.value)}>
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
          className="border border-black mx-5 p-2"
          required
        />

        <br /><br />

        <label>Answer 1</label>
        <input value={answerOne} onChange={(e) => setAnswerOne(e.target.value)} required  className='border border-black mx-5'/>

        <br /><br />

        <label>Answer 2</label>
        <input value={answerTwo} onChange={(e) => setAnswerTwo(e.target.value)} required className='border border-black mx-5'/>

        <br /><br />

        <label>Answer 3</label>
        <input value={answerThree} onChange={(e) => setAnswerThree(e.target.value)} required className='border border-black mx-5'/>

        <br /><br />

        <label>Answer 4</label>
        <input value={answerFour} onChange={(e) => setAnswerFour(e.target.value)} required className='border border-black mx-5'/>

        <br /><br />

        <label>Answer 5</label>
        <input value={answerFive} onChange={(e) => setAnswerFive(e.target.value)} required className='border border-black mx-5'/>

        <br /><br />
        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-4" onClick={() => navigate("/teacherContent")}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {isSubmitting ? "Saving..." : "Submit Homework"}
        </button>
      </form>
    </div>
    </>
  );
}