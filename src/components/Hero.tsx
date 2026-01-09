import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate(); // ✅ define navigate before using it

  return (
    <>
    <section className="w-full border border-black p-3 mb-5 text-white bg-cover bg-center rounded-xl hero relative" style={{backgroundImage: `url('/fuji.jpg')`}}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 rounded-xl"></div>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 p-6"
      >
        
        <h1 className="mb-4 text-4xl sm:text-6xl font-extrabold">Evolved MENtality</h1>
        <hr />
        <p className="mt-4 mb-6 text-sm sm:text-xl">Welcome to Evolved MENtality - A brotherhood rooted in empowerment, wellness, mentorship and growth. Together we evolve.</p>
        <p className="mb-6 text-xs sm:text-lg">
          Healthy Masculinity Advocacy | Holistic Wellness | Personal Evolution | MENtorship
        </p>
        <button
          className="px-6 py-2 font-semibold text-blue-900 bg-white rounded-full transition-all duration-300 hover:bg-gray-300"
          onClick={() => navigate('/join')}
        >
          Become a Member
        </button>
      </motion.div>
    </section>
    </>
  );
}
