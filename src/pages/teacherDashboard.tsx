import Navbar from "../components/navbar"
export default function TeacherDashboard() {
    return (
        <>
        <Navbar />
        <div className="container mx-auto p-5">
        <div className="container mx-auto mt-13 p-5 text-center">
          <h1 className="text-2xl sm:text-4xl m-2 ">Teacher Dashboard</h1>
          <p className="m-2 text-sm sm:text-base">Welcome to your dashboard. Here you can create and manage homework assignments for your students.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Content for teacher dashboard can be added here */}
            <div className="p-5 m-2 border border-gray-400 rounded">
              <h2 className="text-xl font-bold mb-2">New User?</h2>
                <p className="mb-4">If you are a new teacher, please refer to the instructions on the home page to get started.</p>
                <section className="mb-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => window.location.href = '/SignInTeacher'}>Sign Up</button>
                </section>
            </div>
            <div className="p-5 m-2 border border-gray-400 rounded">
                <h2 className="text-xl font-bold mb-2">Existing User?</h2>
                <p className="mb-4">Log in to create and manage homework assignments for your students.</p>
                <section className="mb-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => window.location.href = '/LogTeacherIn'}>Log In</button>
                </section>
            </div>
            </div>
        </div>
        </>
    )
}