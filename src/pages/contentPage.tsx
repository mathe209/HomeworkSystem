import Navbar from '../components/navbar';
import CardImg from "../components/cardImg"

export default function ContentPage() {
    // Define weeks data
    const weeks = [
        { id: 1, title: "Week 1", image: "week1.png",
            content_title: "Introduction and Overview", 
            content: "Why is understanding technology important?", 
            file: "week1.zip" 
        },
        { id: 2, title: "Week 2", image: "week2.jpg", 
            content_title: "The interconnect of everything",
            content: "How the internet connects everything, and using search engines", 
            file: "week2.zip" 
        },
        { id: 3, title: "Week 3", image: "week3.jpg", 
            content_title: "Tech's role in the world",
            content: "How technology has changed the world and exploring using technology as a tool", 
            file: "week3.zip" },
        { id: 4, title: "Week 4", image: "week4.png", 
            content_title: "Tools for creation",
            content: "How to create using technology", 
            file: "week4.zip" },
        { id: 5, title: "Week 5", image: "week5.png", 
            content_title: "Practical activities",
            content: "Practical activities to apply what you have learned", 
            file: "week5.zip" },
    ]

    return (
        <>
            <Navbar />
            <div className="flex justify-center p-2 mt-7 mx-auto w-full">
                <h1 className="text-4xl font-bold bg-gray-900 border-b-2 border-blue-600 p-2 rounded-t-lg text-white">ENCELADUX-1 CONTENT PAGE</h1>
            </div>
            <div className="justify-center mb-5 mx-auto w-full">
                <h2 className="text-2xl font-semibold bg-gray-600 border-b-2 border-blue-500 p-2 rounded-t-lg text-white my-3">Final Project 2025</h2>
                <div className='relative max-w-4xl rounded-xl bg-img-abstract bg-cover bg-center p-4 content-center mx-auto text-white'>
                    <div className="absolute inset-0 bg-black/60 rounded-xl"></div>
                    <div className="relative z-10">
                    <p className='my-3 p-1'>The objective is to create a compelling scenario using Scratch Programming.</p>
                    <h5 className="text-xl font-semibold my-2">Steps to follow:</h5>
                    <ol>
                        <li>1. Choose a theme or topic for your scenario (e.g., adventure, education, storytelling).</li>
                        <li>2. Plan the storyline, characters, and interactions within your scenario.</li>
                        <li>3. Use Scratch programming to bring your scenario to life with animations, sounds, and interactive elements.</li>
                    </ol>
                    </div>
                </div>
                <div className = "mx-auto grid grid-col-1 gap-2 mt-2 sm:grid sm:grid-cols-3">
                    <iframe
                        className="w-full h-96 m-2 mx-auto border border-blue-400  rounded-lg shadow-lg"
                        src="https://www.youtube.com/embed/1jHvXakt1qw"
                        allowTransparency={true}
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        >

                    </iframe>
                    <iframe
                        className="w-full h-96 m-2 mx-auto border border-blue-400  rounded-lg shadow-lg"
                        src="https://www.youtube.com/embed/uv8mbL-MC58"
                        allowTransparency={true}
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        >

                    </iframe>
                    <iframe
                        className="w-full h-96 m-2 mx-auto border border-blue-400  rounded-lg shadow-lg"
                        src="https://www.youtube.com/embed/CvSOVWyyjJI"
                        allowTransparency={true}
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        >

                    </iframe>
                </div>
            </div>
            <div className="flex justify-center mb-5 mx-auto w-full">
                <h2 className="text-lg sm:text-2xl font-semibold bg-blue-800 border-b-2 border-blue-500 p-2 rounded-t-lg text-white">Explore the weekly content below. Click on "View Slides" to access the materials for each week.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3 gap-4 mx-auto w-full sm:container container text-sm sm:text-base max-fit p-2 mb-10">
                {weeks.map((week) => (
                    <div key={week.id} className="bg-blue-300 rounded shadow-lg flex">
                        {/* Left side */}
                        <div className="w-1/2 p-4">
                            <CardImg source={week.image} />
                        </div>

                        {/* Right side */}
                        <div className="w-1/2 bg-blue-500 p-4">

                            <h2 className="text-base sm:text-2xl font-bold bg-blue-900 border-b-2 border-blue-600 p-2 rounded-t-lg text-white">{week.content_title}</h2>
                            <br/>
                            <hr />
                            <p className="text-white text-base sm:text-lg py-2">{week.content}</p>
                            <br />
                            <a
                                href={week.file}
                                target="_blank"
                                download={week.file}
                                rel="noopener noreferrer"
                                className="mt-2 inline-block bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow hover:bg-blue-300"
                                >
                                View Slides
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
