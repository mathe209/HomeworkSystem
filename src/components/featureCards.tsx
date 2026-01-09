import { motion } from 'framer-motion';

interface Feature {
  title: string;
  desc: string;
}

export default function FeatureCards({ features }: { features: Feature[] }) {
  return (
    <section className="p-5 bg-gradient-to-l from-black to-gray-400 rounded-xl mb-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5 px-4 hover:text-white">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-gray-200 p-6 rounded-xl shadow-lg hover:animate-pulse hover:bg-gray-200 hover:text-white"
         >
            <h2 className="text-black text-lg md:text-2xl font-bold mb-2">{f.title}</h2>
            <p className="text-base sm:text-black md:text-lg text-gray-800">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
