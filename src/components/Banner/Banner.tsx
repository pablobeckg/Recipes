import "./Baner.css";

const Banner = () => {
  return (
    <section
      className="banner-container"
      style={{ backgroundImage: `url("/images/Banner.jpg")` }}
    >
      <div className="black-overlay">
        <h1>
          Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben
          Sie unvergessliche Momente bei Tisch.
        </h1>
      </div>
    </section>
  );
};

export default Banner;
