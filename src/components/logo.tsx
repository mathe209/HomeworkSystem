export default function LogoImage() {
  return (
    <div className="flex justify-center px-4 py-4">
      <img
        src="login.jpg"
        alt="Learning Program Logo"
        className="object-contain w-full max-w-xs h-96 rounded-lg shadow-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        loading="lazy"
        
      />
    </div>
  );
}
