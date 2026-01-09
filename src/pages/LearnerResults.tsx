import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

async function fetchLearnerResults(homeworkId: number) {
    try{
        const response = await fetch(`http://localhost:3000/teacher/learner-results/${homeworkId}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        const data = Array.isArray(responseData) ? responseData : [responseData];
        console.log(data);
        return data;


    }catch (error:any){
        if (error.response.status === 401) {
            alert("Error: " + error.response.data.message);
        } else {
            alert("Request failed: " + error.message);
        }
    }
}

function downloadCSV(results: any[]) {
  if (!results.length) return;

  const headers = [
    "Learner Name",
    "Score",
    "Total",
    "Subject",
    "Grade",
    "Percentage",
    
  ];

  const rows = results.map((r) => [
    r.student.name,
    r.score,
    r.total,
    r.homework.subject,
    r.student.grade,
    r.total > 0 ? ((r.score / r.total) * 100).toFixed(0) : "0",
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `learner-results-homework-${results[0].homework.id}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}

export default function LearnerResults() {
    const [homeworkId, setHomeworkId] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState("");
    const { me, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
    const handleFetchResults = async (e: any) => {
        e.preventDefault();
        setError("");
        setResults([]);
        const results = await fetchLearnerResults(parseInt(homeworkId));
        setResults(results || []);
    };
    return (
        <>
            <Navbar />
            <div className="border border-black mt-15 m-5 sm:mx-10 md:mx-25 mb-5 min-h-screen rounded-xl p-2 bg-white">
                <div className="mt-3 mb-4 text-gray-600 text-sm">
                    logged in as: {me ? me.name : "Not logged in"}
                </div>
                <h1 className="text-3xl font-bold mb-4 text-center">Learner Results</h1>
                <form onSubmit={handleFetchResults} className="mb-4 text-center">
                    <input
                        type="text"
                        placeholder="Enter Homework ID"
                        value={homeworkId}
                        onChange={(e) => setHomeworkId(e.target.value)}
                        className="border border-gray-300 p-2 rounded mr-2"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Fetch Results
                    </button>
                </form>
                <button
                    onClick={() => downloadCSV(results)}
                    className="my-4 bg-orange-500 text-white px-2 py-4 rounded hover:bg-orange-700 active:bg-orange-700"
                >
                    Download CSV
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {results.length > 0 && (
                    <div className="flex justify-center">
                    <table className="min-w-full max-w-5xl mx-auto text-center">
                        <thead>
                            <tr>
                                <th className="py-2 px-3 border-b text-center text-xs sm:text-lg">Learner Name</th>
                                <th className="py-2 px-3 border-b text-center text-xs sm:text-lg">Score</th>
                                <th className="py-2 px-3 border-b text-center text-xs sm:text-lg">Total</th>
                                <th className="py-2 px-3 border-b text-center text-xs sm:text-lg">Subject</th>
                                <th className="py-2 px-3 border-b text-center text-xs sm:text-lg">Percentage</th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-2 border-b">{result.student.name}, {result.student.grade}</td>
                                    <td className="py-2 px-2 border-b">{result.score}</td>
                                    <td className="py-2 px-2 border-b">{result.total}</td>
                                    <td className="py-2 px-2 border-b">{result.homework.subject}</td>
                                    <td className="py-2 px-2 border-b">
                                        {result.total > 0
                                            ? ((result.score / result.total) * 100).toFixed(0)
                                            : "0"}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                )}
            </div>
            <div className="flex justify-center">
                <button className="my-3 mx-5 bg-red-500 text-white px-4 py-2 rounded" onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = '/';
                }}>Log Out</button>
                <button className="my-3 mx-5 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {
                    window.location.href = '/teacherContent';
                }}>Back to Dashboard</button>
            </div>
            <Footer />
        </>
    );
}
        