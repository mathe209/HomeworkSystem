import { useEffect, useState } from "react";
import axios from 'axios'
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE = 'https://www.evolvedmentality.co.za/api'
async function getTeacherHomeworks() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/teacher/show-homeworks`, {
    headers: { Authorization: `Bearer ${token}`, }, withCredentials: true,
  });
  return res.data;
}

function formatDate(dateString: string) {
  // Works for: 2026-01-14T00:00:00.000Z OR 2026-01-14 02:00:00
  const [datePart] = dateString.split("T");

  const [year, month, day] = datePart.split("-");

  return `${day} ${new Date(`${year}-${month}-01`).toLocaleString("en-ZA", {
    month: "long",
  })} ${year}`;
}

export default function TeacherContent() {
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const { me, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // wait until auth finishes (optional but nice)
    getTeacherHomeworks().then(setHomeworks).catch(console.error);
  }, [loading]);

  if (loading) return <div>loading...</div>;
  const navigate = useNavigate()
  return (

    <>
      <div className="my-2 mx-10">
        <h2 className="text-gray-600 font-bold text-sm">{me ? `Signed in as ${me.name}` : `Not signed in`}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {homeworks.map((hw) => (
          <div key={hw.id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md">
            <h3 className="text-green-600 font-bold text-lg p-2">{"Subject: " + hw.subject}<br></br>{"Homework ID: " + hw.id}<br></br>{"Created at: " + formatDate(hw.timeStamp)}</h3>
            <p className="text-gray-600 font-bold text-sm p-2">Questions: {hw.mcqs?.length ?? 0}</p>

            <div>
              {hw.mcqs?.map((mcq: any) => (
                <div key={mcq.id} style={{ marginTop: 8, paddingLeft: 12 }}>
                  <p><strong>Q:</strong> {mcq.question}</p>
                  <ul>
                    <li>A: {mcq.optionA}</li>
                    <li>B: {mcq.optionB}</li>
                    <li>C: {mcq.optionC}</li>
                    <li>D: {mcq.optionD}</li>
                    {mcq.optionE ? <li>E: {mcq.optionE}</li> : null}
                  </ul>
                  <p><strong>Correct:</strong> {mcq.correctOption}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-5">
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={async () => {navigate("/teacherContent")}}>Create New Homework</button>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => {
          localStorage.removeItem("token");
          navigate('/');
        }}>Log Out</button>
      </div>
    </>
  );
}