import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import type { RepeatType, Easing } from "framer-motion";

const repeatType: RepeatType = "loop";
const ease: Easing = "easeInOut";

const bounceSettings = {
  animate: { y: [0, -10, 0] },
  transition: {
    duration: 1,
    repeat: Infinity,
    repeatType,
    ease,
  },
};

export default function Socials() {
  return (
    <div className="flex gap-5 justify-center mb-10 mt-10 border-t pt-5">
      <motion.a
        href="https://www.instagram.com/evolved_men_tality/"
        target="_blank"
        rel="noopener noreferrer"
        {...bounceSettings}
        className=' text-black hover:text-pink-400 transition'
      >
        <Instagram size={44} />
      </motion.a>

      <motion.a
        href="https://www.facebook.com/evolved.mentality/"
        target="_blank"
        rel="noopener noreferrer"
        className=' text-black hover:text-blue-400 transition'
        animate={{ y: [0, -10, 0] }}
        transition={{ ...bounceSettings.transition, delay: 0.2 }
      }
      >
        <Facebook size={44} />
      </motion.a>

      <motion.a
        href="mailto:evolvedblackmen@gmail.com"
        animate={{ y: [0, -10, 0] }}
        transition={{ ...bounceSettings.transition, delay: 0.4 }}
        className=' text-black hover:text-red-800 transition'
      >
        <Mail size={44} />
      </motion.a>

      <motion.a
        href="tel:0694568316"
        animate={{ y: [0, -10, 0] }}
        transition={{ ...bounceSettings.transition, delay: 0.6 }}
        className=' text-black hover:text-gray-400 transition'
      >
        <Phone size={44} />
      </motion.a>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ ...bounceSettings.transition, delay: 0.65 }}
      >
        <a
          href="https://chat.whatsapp.com/HwMmEB6tXDJFa3Im3hJ7f7?fbclid=PAY2xjawKZqudleHRuA2FlbQIxMQABp9YRj-7yZk_f4alwFQacjVPgZe7XpSjxcWQP9XCF1gk8Ymt-P3pJLFxT3roa_aem_ktLaWw2QiUBdCqFLKXAD7w"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faWhatsapp} size='3x' className="text-black hover:text-green-400 transition" />
        </a>  
      </motion.div>
    </div>
  );
}
