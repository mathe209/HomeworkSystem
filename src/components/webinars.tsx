export default function Webinars() {
    return (
        <div className="pb-5 mx-auto mt-12 max-w-6xl sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-white lg:flex-row lg:gap-8 sm:p-6 lg:p-8">
                <div className="space-y-4 w-full lg:w-1/2">
                    <h1 className="text-3xl font-bold text-center text-white sm:text-4xl">Upcoming Webinar</h1>
                    <hr className="border-gray-600" />
                    <div className="space-y-3">
                        <p className="text-base text-center sm:text-lg">
                            <span className="font-bold text-white">Guest Speaker:</span> Mr Hloleho Rampete
                        </p>
                        <p className="text-base text-center sm:text-lg">
                            <span className="font-bold text-white">Date:</span> 25th September 2025
                        </p>
                        <p className="text-base text-center sm:text-lg">
                            <span className="font-bold text-white">Time:</span> 18:30 - 19:30 CAT
                        </p>
                        <p className="text-base text-center sm:text-lg">
                            <span className="font-bold text-white">Topic:</span> Geopolitics and Economics
                        </p>
                        <p className="pb-3 text-base text-center sm:text-lg">
                            <span className="font-bold text-white">Theme:</span> Modern wisdom on Geopolitical and Economic challenges.
                        </p>
                    </div>
                    <div className="flex justify-center pt-2">
                        <button 
                            className="px-6 py-3 text-sm font-semibold text-black bg-white rounded-full transition-all duration-300 transform sm:py-2 sm:text-base hover:bg-gray-300 hover:scale-105"
                            onClick={() => window.open('https://meet.google.com/stg-fmbu-eba', '_blank', 'noopener,noreferrer')}
                        >
                            Register Now
                        </button>
                    </div>
                </div>
                <div className="mt-6 w-full lg:w-1/2 lg:mt-0">
                    <img 
                        src="webinar3.jpg" 
                        alt="" 
                        className="w-full h-[26rem] max-h-96 sm:max-h-[94rem] object-fill rounded-xl shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}