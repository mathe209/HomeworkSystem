import Navbar from "../components/navbar";
import Socials from "../components/socials";
import MentoForm from "../components/mentoForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css"
// import { Helmet } from "react-helmet-async";
export default function MENtorship() {
  const images = [
    "/event5.jpg",
    "/mentorship2.jpg",
    "/mentorship4.jpg"
  ];
  const images1 = [
    "/event5.jpg",
    "/mentorship2.jpg",
    "/mentorship4.jpg",
    "/mentorship5.jpg",
    "/mentorship6.jpg",
    "/mentorship7.jpg",
    "/mentorship8.jpg"
  ];

  return (
    <>
        {/*Search Engine Optimization */}
        {/* <Helmet>
        <title>Mentorship | Evolved Mentality</title>
        <meta name="description" content="Join our MENtality Mentorship Program focused on male mental health, growth, and community support." />
        <meta name="keywords" content="mentorship, men's health, mental health, Evolved Mentality, depression, GBV, support, South Africa" />
        <meta property="og:title" content="Mentorship | Evolved Mentality" />
        <meta property="og:description" content="A safe space and growth community for young men through mentorship." />
        <meta property="og:image" content="/mentorship-cover.jpg" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet> */}
      <Navbar />
      <div className="mt-15 m-5 sm:mx-25 mb-10 ">
      <div className="mb-4 p-5 rounded-xl bg-gradient-to-r from-black to-gray-800 text-white justify-center"> 
        <h1 className="text-4xl font-extrabold mt-4 pt-4">MENTORSHIP</h1>
        <hr/>
        <p className="text-xl mb-4 mt-4">
          Welcome to the MENtorship Program.
        </p>
        <p>
          Our main objective is to foster professional growth and learning. By blending technology with human connection thoughtfully.
        </p>
      </div>

      <div className="mb-5 text-white p-4 rounded-xl bg-gradient-to-l from-black to-gray-800 text-lg">
        <h1 className="text-2xl text-white font-bold m-3">Capabilities of the MENtorship Program
        <hr className="my-4"/>
        </h1>
        <p>
          <strong>Structured Program</strong>: Clear goals, timelines,and defined outcomes that will be supported by our mentorship learning outcomes and evaluation metrics.
        </p>
        <p>
          <strong>Customization</strong>: Tailored to address specific needs, be it career guidance, industry insights, and personal growth.
        </p>
        <p>
          <strong>Digital Interaction</strong>: Calls, video calls, chat apps and virtual collaboration platforms like GoogleMeet, Teams and Zoom.
        </p>
        <p>
          <strong>Global Reach</strong>: Removes geographical barriers, enabling diverse mentor-mentee pairings.
        </p>
        <p>
          <strong>Flexibility</strong>: Participants set meetings that accommodate different time zones and lifestyles.
        </p>

      </div>

      <div className="">
        {/* Carousel for small screens */}
        <div className="block md:hidden justify-center">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            modules={[Autoplay]}
          >
            {images1.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`mentorship-${idx}`}
                  className="images rounded-lg mx-auto"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid for larger screens */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 justify-center">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              className="images rounded-lg object-fill"
              alt={`mentorship-${idx}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <h2 className="text-3xl font-extrabold mb-4 mt-4 text-center justify-center">Become a mentor/mentee</h2>
      <img src="/logo.jpg" alt="logo" className="w-54 h-44 mx-auto mb-4 rounded-xl mt-6"/>
      </div>
      <div className="flex justify-center mx-5 mb-10">
      <MentoForm />
      </div>
      <Socials />
    </>
  );
}
