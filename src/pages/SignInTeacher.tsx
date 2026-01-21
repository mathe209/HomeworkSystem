import LogUserTeacher from "../components/SignInFormTeacher";
import Navbar from "../components/navbar";
export default function SignInTeacher() {
    return (
        <>
        <Navbar />
        <div className="container mx-auto p-5 mt-10">
            <h1 className="text-lg sm:text-4xl font-bold text-black text-center py-4">Sign in as a Teacher/Tutor</h1>
            <LogUserTeacher />
        </div>
        </>
    );
}