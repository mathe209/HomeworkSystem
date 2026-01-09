import { useState } from "react";
import Navbar from "../components/navbar";
import Socials from "../components/socials";
const eventImages = [
  { src: "/event1.jpg", caption: "Youth Mentorship Workshop 2025" },
  { src: "/event2.jpg", caption: "Mental Health Awareness Day" },
  { src: "/event3.jpg", caption: "Fatherhood Workshop" },
  { src: "/event4.jpg", caption: "Community Clean-up Drive" },
  { src: "/event62.jpg", caption: "LGBTQ+ Inclusivity Talk" },
  { src: "/event6.jpg", caption: "Spiritual Retreat" },
];


export default function Event() {
  type ImageType = {
    src: string;
    caption: string;
  };
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  return (
    <>
    <Navbar/>
    <div className="mt-15 mx-5 sm:mx-10 md:mx-25 min-h-screen rounded-xl">
      <h2 className="my-3 p-3 text-3xl font-bold text-center">Event Highlights</h2>
      <hr/>

      <p className="p-3">
        We recently attended an event called EMPOWAMEN Annual Summit held at Randburg, Johannesburg in May.<br/>
        This event saw various stakeholders, including subject experts on matters like mental and physical health, influential leaders like the Minister of Social Development, business leaders and other high standing individuals come together.
      </p>
      <p className="p-3">
        The event allowed us to bring our members who are mentors, facilitators and general volunteers to get empowered with knowledge and expertise to continue the ripple effect of making changes in their respective communities.
      </p>
      <div className="grid grid-cols-1 gap-4 mx-auto mb-4 sm:grid-cols-2 md:grid-cols-3">
        {eventImages.map((img, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer group"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="object-cover w-full h-64 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 p-2 w-full text-sm text-center text-white bg-black bg-opacity-50">
              {img.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div
          className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-80"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="max-w-full max-h-[80vh] rounded-lg"
            />
            <p className="mt-2 text-center text-white">{selectedImage.caption}</p>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 px-3 py-1 text-xl text-white bg-black bg-opacity-60 rounded-full hover:bg-opacity-80"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <Socials/>
    </div>
    </>
  );
}
