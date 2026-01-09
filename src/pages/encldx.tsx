import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {ChevronDown} from 'lucide-react';


export default function Encldx() {
    const [activeDescription, setActiveDescription] = useState("");

    const descriptions = [{
        title: "Mini Game",
        description: "Learners are challenged to create simple mini games using coding blocks, fostering creativity and problem-solving skills."
    },
    {
        title: "Small Animation Programme",
        description: "Learners can design and animate characters or scenes, enhancing their understanding of storytelling and visual effects."  
    },
    {
        title: "Interactive Art",
        description: "Learners explore digital art creation, allowing them to express their creativity through interactive designs and illustrations."
    }
    ]
    const navigate = useNavigate()

     const handleDescriptionClick = (description: string) => {
        setActiveDescription(description);
    };

    return (
        <>
        <Navbar />
        <div className="mt-15 m-5 sm:mx-10 md:mx-25 mb-10 min-h-screen rounded-xl">
            <main className="relative container px-4 py-16 mx-auto max-w-4xl rounded-xl bg-cover bg-center" style={{backgroundImage: `url('/earth.jpg')`}}>
                {/* Dark foreground overlay */}
                <div className="absolute inset-0 bg-black/60 rounded-xl"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center space-y-8">
                    <h1 className="text-3xl font-bold text-white sm:text-5xl text-center">
                        Welcome to the Encldx Program.
                    </h1>

                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <button className="p-3 px-6 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700" onClick={() => navigate('/logInPage')}>
                            Login
                        </button>
                        <button className="p-3 px-6 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700" onClick={() => navigate('/encldxAbout')}>
                            About
                        </button>
                        <button className="p-3 px-6 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700" onClick={() => navigate('/HomeworkHome')}>
                            encldx-2
                        </button>
                    </div>
                </div>
            </main>
            <div className="mt-6 text-center text-black text-xm sm:text-lg">
                Encldx is a cutting-edge platform designed to revolutionize the way you manage and interact with your digital assets.<br></br>
                Opening new ways to integrate technology into learning and teaching.
            </div>
            <div className="mt-6 text-center text-gray-400 grid grid-cols-3 md:grid-cols-3 gap-4 shadow-lg shadow-gray-800 rounded-lg text-xs sm:p-1 sm:text-lg">
                <div className="font-semibold bg-gray-800 rounded-lg p-2">
                    Creativity
                </div>
                <div className="font-semibold bg-gray-800 rounded-lg p-2">
                    Curiosity
                </div>
                <div className="font-semibold bg-gray-800 rounded-lg p-2">
                    Exposure
                </div>
            </div>
            <div className="mt-6 text-center text-white">
                <p><span className='font-bold sm:text-xl border-3 border-b bg-gray-300 rounded p-2 text-black'>Final Project 2026</span> </p>
                <p className='text-black p-3'>Retsamaile Combined School and Thabo Public School</p>
                <div className='mt-3 text-center text-gray-400 border border-black shadow shadow-gray-800 rounded-lg p-2'> 
                    <div className="mt-3 text-center text-gray-400 rounded-lg p-2 grid sm:grid-cols-3 md:grid-cols-3 gap-4">
                        <div className="font-semibold bg-gray-800 rounded-lg p-2"
                            onClick={() => handleDescriptionClick(descriptions[0].description)}>
                            Mini Game
                            <ChevronDown/>
                        </div>

                        <div className="font-semibold bg-gray-800 rounded-lg p-2"
                            onClick={() => handleDescriptionClick(descriptions[1].description)}>
                            Small Animation Programme
                            <ChevronDown />
                        </div>

                        <div className="font-semibold bg-gray-800 rounded-lg p-2"
                            onClick={() => handleDescriptionClick(descriptions[2].description)}>
                            Interactive Art 
                            <ChevronDown/>
                        </div>
                    </div>

                    {/* ✅ Renders description here */}
                    {activeDescription && (
                        <div className="mt-4 text-center text-white bg-gray-700 rounded-lg p-4">
                            <p className="mt-4 p-4 bg-gray-800 text-white rounded-lg">{activeDescription}</p>
                        </div>
                    )}               
                </div>

                <div className="mt-6 text-center text-gray-800 bg-orange-500 rounded-lg p-2">
                    Made with ❤️ by Encldx Team
                </div>
                <div className="mt-6 text-center text-gray-400">
                    &copy; 2025 Encldx.
                </div>
            </div>
        </div>
        </>
    )
}