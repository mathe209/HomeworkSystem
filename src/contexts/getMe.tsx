import axios from 'axios';

const API_BASE:string = 'http://localhost:3000'
export async function getMe() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const res = await axios.get(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data as { id: number; name: string; email: string };
}
