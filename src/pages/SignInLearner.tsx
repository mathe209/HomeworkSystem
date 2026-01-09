import LogUser from "../components/SignInForm";
import Navbar from "../components/navbar";

export default function SignInLearner() {
    return (
        <>
        <Navbar />
        <div className="container mx-auto p-5 mt-10">
            <LogUser />
        </div>
        </>
    );
}