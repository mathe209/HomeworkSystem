import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useAuth } from "../contexts/AuthContext";
import StudentContent from "../components/studentContent";

const API_BASE = "https://www.evolvedmentality.co.za/api";

export default function HomeworkLoader() {
  const [homeworkId, setHomeworkId] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [_loading, setLoading] = useState(false);
  const { me, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  async function loadHomework() {
    if (!homeworkId) return alert("Please enter a homework ID");

    try {
      setLoading(true);

      // 1️⃣ Get homework metadata
      const metaRes = await axios.get(
        `${API_BASE}/homework/${homeworkId}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      const fileId = metaRes.data.homework.originalName;

      if (!fileId) {
        alert("No PDF attached to this homework");
        setPdfUrl(null);
        return;
      }

      // 2️⃣ Fetch PDF file as Blob (with auth)
      const token = localStorage.getItem("token");
      const pdfResponse = await axios.get(`${API_BASE}/files/${fileId}/pdf`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      // 3️⃣ Create object URL for iframe
      const blobUrl = URL.createObjectURL(pdfResponse.data);
      setPdfUrl(blobUrl);
    } catch (err) {
      console.error(err);
      alert("Failed to load homework PDF");
      setPdfUrl(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="mt-20 mb-2 text-gray-600 text-sm mx-5 sm:ms-10 md:mx-25">
        logged in as: {me ? me.name : "Not logged in"}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="p-4 mx-5">
          <h1 className="text-2xl font-bold my-2">Load Homework PDF</h1>

          <div className="flex gap-2 p-3">
            <input
              type="text"
              placeholder="Enter homework ID"
              value={homeworkId}
              onChange={(e) => setHomeworkId(e.target.value)}
              className="border px-2 py-1 rounded flex-1"
            />
            <button
              onClick={loadHomework}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              disabled={_loading}
            >
              {_loading ? "Loading..." : "Load PDF"}
            </button>
          </div>

          {pdfUrl && (
            <iframe
              src={pdfUrl}
              title="Homework PDF"
              width="100%"
              height="600"
              style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            />
          )}
        </div>
        <StudentContent />
      </div>
    </>
  );
}