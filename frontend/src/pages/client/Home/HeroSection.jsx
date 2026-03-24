import React from "react";
import { Link } from "react-router-dom";

const HeroSection = ({ imageUrl }) => {
  const handleScrollToDestaques = (e) => {
    e.preventDefault();
    const element = document.getElementById("destaques");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const backgroundStyle = imageUrl
    ? {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : { backgroundColor: "#FFE4E1" };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center md:justify-start md:pt-24 text-center md:text-left overflow-hidden"
      style={backgroundStyle}
    >
      {imageUrl && <div className="absolute inset-0 bg-black/50" />}
      {imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      )}
      <div className="relative z-10 max-w-5xl w-full px-6 py-20 md:py-16 animate-fade-in">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-lg">
            Descubra os{" "}
            <span className="text-pink-300 drop-shadow-md">melhores doces</span>{" "}
            da região
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed drop-shadow">
            Artesanais, fresquinhos e feitos com carinho para cada ocasião.
            Explore nosso cardápio e deixe-se apaixonar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center rounded-full bg-pink-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              Conhecer o menu
            </Link>
            <a
              href="#destaques"
              onClick={handleScrollToDestaques}
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-base font-semibold text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Ver destaques
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
