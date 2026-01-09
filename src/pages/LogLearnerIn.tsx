import LoginLearner from "../components/LogInLearner";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function LogLearnerIn() {
    return (
        <>
        <Navbar />
        <div className="container mx-auto p-5 mt-10">
        <h1 className="text-2xl sm:text-4xl m-3 text-center font-bold">Learner Login</h1>
            <LoginLearner />
        </div>
        <Footer />
        </>
    );
}