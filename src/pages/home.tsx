
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import UserCards from "../components/UserCards";
export default function Home() {
  return (
    <>
    <Navbar />
    <div className="">
    <div className="container mx-auto mt-13 p-5 text-center">
      <h1 className="text-2xl sm:text-4xl m-2 ">Welcome to the Homework System</h1>
      <p className="m-2 text-sm sm:text-base">Choose the type of user you are and follow the instructions to set up</p>
      <UserCards />
      
    </div>
    </div>
    <Footer />
    </>
  );
}