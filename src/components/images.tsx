export default function Images({ images }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {images.map((src, index) => (
          <div key={index} className="w-full overflow-hidden rounded-xl shadow-lg">
            <img
              src={src}
              alt={`Team member ${index + 1}`}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-125"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    );
  }
  