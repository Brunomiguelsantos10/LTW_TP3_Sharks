export default function Sharks({
  title,
  sharks,
  fallbackText,
  onSelectShark,
  isLoading,
  loadingText,
}) {
  console.log(sharks);
  return (
    <section className="sharks-category">
      <h2>{title}</h2>
      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {!isLoading && sharks.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {!isLoading && sharks.length > 0 && (
        <ul className="sharks">
          {sharks.map((shark) => (
            <li key={shark.id} className="shark-item">
              <button onClick={() => onSelectShark(shark)}>
                <img
                  src={`http://localhost:4000/${shark.image.src}`}
                  alt={shark.image.alt}
                />
                <h3>{shark.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
