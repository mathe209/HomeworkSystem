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
      <div className="mt-15 mx-10">
        <h2>{me ? `Signed in as ${me.name}` : `Not signed in`}</h2>
      </div>

      <div>
        {homeworks.map((hw) => (
          <div key={hw.id} style={{ border: "1px solid #ddd", marginBottom: 12, padding: 12 }}>
            <h3>{"Subject: " + hw.subject}, {"Homework ID: " + hw.id}, {"Created at: " + hw.timeStamp}</h3>
            <p>Questions: {hw.mcqs?.length ?? 0}</p>

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
    </>
  );
}