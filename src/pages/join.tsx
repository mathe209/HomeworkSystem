import Navbar from '../components/navbar'
import JoinForm from '../components/joinForm'
export default function Join() {
    return (
        <>
        <Navbar />
        <div className='mt-15 mx-5 sm:mx-25 mb-10 p-5 rounded-xl'>
            <JoinForm/>
        </div>
        </>
    )
}