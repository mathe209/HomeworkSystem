function changeToOtherPage(userType:string){
    if(userType === 'Student'){
        //navigate to student page
        window.location.href = '/studentDashboard';
    }
    else if(userType === 'Teacher'){
        //navigate to teacher page
        window.location.href = '/teacherDashboard';
    }
}
export default function UserCards() {
    const TypeofUser:string[] = ['Student', 'Teacher'];

    // map each user type to its background image
    const bgImages: Record<string,string> = {
        Student: '/student.jpg',
        Teacher: '/teacher.jpg',
        Cover: '/man.jpg',
    };

    return (
        <>
        <div
            className="relative mb-2 text-left p-2 border border-gray-400 bg-cover bg-center text-white"
            style={{ backgroundImage: `url('${bgImages.Cover}')` }}
        >
            {/* semi-transparent overlay behind content */}
            <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

            {/* content above overlay */}
            <div className="relative z-10">
                <h1 className="text-lg sm:text-2xl font-bold">Instructions on how to use the app</h1>
                <ul className="p-3 text-sm sm:text-lg">
                    <li>1. Select your user type by clicking on the respective card below.</li>
                    <li>2. Follow the instructions provided for your user type.</li>
                    <li>3. For Students: Log in to view and complete your homework assignments.</li>
                    <li>4. For Teachers: Log in to create and assign homework to your students.</li>
                    <li>5. Ensure you have a stable internet connection for the best experience.</li>
                </ul>
            </div>
        </div>
        <section className="p-1 justify-center grid grid-cols-2 gap-4">
            {TypeofUser.map((type) => (
            <div
                key={type}
                className="relative border border-green-400 p-5 bg-cover bg-center text-white rounded"
                style={{ backgroundImage: `url('${bgImages[type]}')` }}
            >
                {/* overlay for each card */}
                <div className="absolute inset-0 bg-black/50 pointer-events-none rounded"></div>

                {/* card content above overlay */}
                <div className="relative z-10">
                    <h2 className="text-lg sm:text-2xl p-1">{type}</h2>
                    {type === 'Student' && (
                    <p className="p-1 text-sm sm:text-lg">
                        As a Student, you can view and complete homework assignments assigned by your teachers. Log in to see your tasks and submit your answers.
                    </p>
                    )}
                    {type === 'Teacher' && (
                    <p className="p-1 text-sm sm:text-lg">
                        As a Teacher, you can create and assign homework to your students. Log in to manage assignments and track student progress.
                    </p>
                    )}
                </div>
            </div>
            ))}
            <section className="col-span-2 flex justify-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => changeToOtherPage('Student')}>Continue As a Student</button>
                <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => changeToOtherPage('Teacher')}>Continue Asa  Teacher</button>
            </section>
        </section>
        <div className="mt-5 text-left p-1">
            <h2 className="text-lg sm:text-2xl font-bold">Note:</h2>
            <p className="p-3 text-sm sm:text-lg">
                This application is designed to facilitate homework management for both students and teachers. Please ensure you follow the instructions carefully to make the most out of the features provided.
            </p>
        </div>
        </>
    );
}