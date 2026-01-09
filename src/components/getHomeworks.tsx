import { useEffect, useState } from "react";
import axios from 'axios'
import { useAuth } from "../contexts/AuthContext";

const API_BASE = 'http://localhost:3000'
async function getTeacherHomeworks() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/teacher/show-homeworks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
export default function TeacherContent() {
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const { me, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // wait until auth finishes (optional but nice)
    getTeacherHomeworks().then(setHomeworks).catch(console.error);
  }, [loading]);

  if (loading) return <div>loading...</div>;

  return (
    <>
      <div className="my-2 mx-10">
        <h2 className="text-gray-600 font-bold text-sm">{me ? `Signed in as ${me.name}` : `Not signed in`}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {homeworks.map((hw) => (
          <div key={hw.id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md">
            <h3 className="text-green-600 font-bold text-lg p-2">{"Subject: " + hw.subject}<br></br>{"Homework ID: " + hw.id}<br></br>{"Created at: " + hw.timeStamp}</h3>
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
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={async () => {window.location.href="/teacherContent"}}>Create New Homework</button>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => {
          localStorage.removeItem("token");
          window.location.href = '/';
        }}>Log Out</button>
      </div>
    </>
  );
}