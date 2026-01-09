
import Navbar from '../components/navbar';

export default function Aboutencldx() {
    return (
        <>
            <Navbar />
            <div className="mt-9 min-h-screen text-white bg-gradient-to-r from-black to-gray-800">
                <main className="container px-4 py-6 mx-auto max-w-4xl text-white">
                    <div className="flex flex-col items-center mb-4 space-y-8">
                        <h1 className="text-2xl font-bold text-center">About</h1>
                        <p className="text-center">Enceladux-1 is a school based program that teaches students about technology and how to use it.</p>
                        <p className="text-center">The program is designed to be interactive and engaging, with a focus on hands-on learning.</p>
                        <p className="text-center">Our main focus is exposing young minds to using technology as a tool to create and solve problems.</p>
                    </div>
                    <hr/>
                    <div className="flex flex-col items-center mt-4 space-y-8">
                        <h1 className="text-2xl font-bold text-center">Contact</h1>
                        <p className="text-center">If you have any questions or feedback, please feel free to contact us.</p>
                        <p className="text-center">You can reach us at <a href="mailto:info@enceladux1.com">info@enceladux1.com</a>.</p>
                    </div>
                    <hr/>
                    <div className="flex flex-col items-center mt-4 space-y-8">
                        <h1 className="text-2xl font-bold text-center">Meet the team</h1>
                        <div className="flex flex-col items-center space-y-8">
                            <div>
                                <img src="Mathe.jpg" alt="Mathe.jpg" className="p-3 w-64 h-64 rounded-full" />
                                <span className="pt-2 text-center">
                                <h2 className="text-lg font-bold">Mr M Mohlamme</h2>
                                <p>Founder and curator</p>
                                </span>
                            </div>
                            <div>
                                <img src="Mohapi.jpg" alt="Mohapi.jpg" className="p-3 w-64 h-64 rounded-full" />
                                <span className="pt-2 text-center">
                                <h2 className="text-lg font-bold">Mr S Mohapi</h2>
                                <p>Facilitator</p>
                                </span>
                            </div>
                            <div>
                                <img src="Seipati.jpg" alt="Seipati.jpg" className="p-3 w-64 h-64 rounded-full" />
                                <span className="pt-2 text-center">
                                <h2 className="text-lg font-bold">Ms S Mokoma</h2>
                                <p>Facilitator</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}