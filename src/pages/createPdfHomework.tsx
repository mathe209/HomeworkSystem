import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
const API_BASE = "https://www.evolvedmentality.co.za/api";

type UploadedFile = {
  id: number;
  originalName: string;
  url: string;
};

type Props = {
  onUploadSuccess?: (file: UploadedFile) => void;
};

function resetToken(){
    localStorage.token = null;
    window.location.href = '/';
}

export default function TeacherPdfUpload({ onUploadSuccess }: Props) {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {me, loading} = useAuth()
  if (loading) return <div>loading...</div>

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    setError(null);
    setFile(selected);
  }

  async function uploadFile() {
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_BASE}/files/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }, withCredentials: true,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(`Uploading: ${percent}%`);
            }
          },
        }
      );

      onUploadSuccess?.(res.data);
      setFile(null);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Navbar/>
    <div className="mt-15 mx-10">
      logged in as: {me?.name}
    </div>
    <div className="border rounded-lg p-4 space-y-4 mx-5">
      <h3 className="font-bold text-lg">
        Upload Question Paper (PDF)
      </h3>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />

      {file && (
        <p className="text-sm text-gray-600">
          Selected: {file.name}
        </p>
      )}

      {error && (
        <p className="text-red-600 text-sm">
          {error}
        </p>
      )}

      <button
        onClick={uploadFile}
        disabled={!file || uploading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
    </div>
    <section className="mx-5 my-5">
          <button
            type="button"
            className="bg-blue-500 border-blue-500 rounded-lg p-3 mx-5"
            onClick={() => navigate("/teacherContent")}
          >
            Done / Manage Homeworks
          </button>
          <button className="bg-red-500 border-blue-500 rounded-lg p-3 mx-5 my-5" onClick={()=>resetToken()}>
              Log Out
          </button>
        </section>
    </>
  );
}
