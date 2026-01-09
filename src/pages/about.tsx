import { motion } from 'framer-motion';
import Images from '../components/images';
import Navbar from '../components/navbar';
import Socials from '../components/socials';
const images = [
    "/lerato.jpg",
    "/kamohelo.jpg",
    "/kutlwano.jpg",
    "/aphelele.jpg",
    "/tumelo.jpg"
]
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const pageTransition = {
  duration: 0.5,
  ease: 'easeInOut' as const,
};

export default function About() {
  return (
    <>
    <Navbar/>
    <div className='mt-15 mx-5 sm:mx-25 mb-10 p-5 rounded-xl hero bg-gradient-to-r from-black to-gray-800 text-white'>
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {/* Your page content here */}
      <div className="container m-3 p-2  rounded-xl hero bg-gradient-to-r from-black to-gray-800 text-white">
        <h1 className="text-6xl font-extrabold mb-4">About Us</h1>
        <hr/>
        <p className="mb-6 mt-4">
            We pride ourselves on leveraging technology and the power of social media to blur the lines of geographical separation.<br/>
            Through this we are able to unite members of our community in one unison integrated platform.
        </p>

      </div>
      <p className="text-2xl font-bold mb-4 mt-4">Meet the team</p>
      <hr/>
    </motion.div>
    <div className='mt-5 mb-5'> 
    <Images images={images}/>
    </div>
    <p className='text-center mb-6'>Est. 2023</p>
    </div>
    <Socials/>
    </>
  );
}
