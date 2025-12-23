// import axios from "axios";
// import { useEffect, useState } from "react";
//const API_BASE = "http://localhost:3000"; // change for production
import { useAuth } from "../contexts/AuthContext";

// async function getMe() {
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   const res = await axios.get(`${API_BASE}/me`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data as { id: number; name: string; email: string };
// }

async function getTeacherContent() {
  // const token = localStorage.getItem("token");
  // const res = await axios.get(`${API_BASE}/SendTeacherFile`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // });
  // return res.data;
  window.location.href="/homeworkPage"
}

async function getHomeworks(){
  window.location.href = '/manageHomeworks'
}
//type Me = { id: number; name: string; email: string };
export default function TeacherHeader() {
  // const [me, setMe] = useState<Me | null>(null);
  // useEffect(() => {
  //   getMe()
  //     .then(setMe)
  //     .catch(() => setMe(null));
  // }, []);
  const {me, loading} = useAuth();
  if (loading) return <div>loading...</div>
  return (
    <>
    <div style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <strong>{me ? `Signed in as: ${me.name}` : "Not signed in"}</strong>
    </div>
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Teacher Content Page</h1>
      <p className="text-center">Here you can create and manage homework assignments for your students.</p>
      {/* <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => {
        localStorage.removeItem("token");
        window.location.href = '/';
      }}>Log Out</button> */}
      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={async () => {getTeacherContent()}}>Create Homework</button>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick = {async () => {getHomeworks()}}>See Homeworks</button>
    </div>
    </>
  );
}