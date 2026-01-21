import LogUser from "../components/SignInForm";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function SignInLearner() {
    return (
        <>
        <Navbar />
        <div className="container mx-auto p-5 mt-10">
            <h1 className="text-lg sm:text-4xl font-bold text-black text-center py-4">Sign in as a Learner</h1>
            <LogUser />
        </div>
        <footer>
            <Footer/>
        </footer>
        </>
    );
}