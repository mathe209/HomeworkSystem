import LogUserTeacher from "../components/SignInFormTeacher";
import Navbar from "../components/navbar";
export default function SignInTeacher() {
    return (
        <>
        <Navbar />
        <div className="container mx-auto p-5 mt-10">
            <LogUserTeacher />
        </div>
        </>
    );
}