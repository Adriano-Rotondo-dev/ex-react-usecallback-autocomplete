import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  console.log(suggestions);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    fetch(`http://localhost:3333/products?search=${query}`)
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((error) => console.error(error));
  }, [query]);

  return (
    <>
      <h1 className="text-center"> Autocomplete</h1>
      <div className="position-relative w-100">
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a product"
        />
        {suggestions.length > 0 && (
          <div className="dropdown-menu show w-100">
            {suggestions.map((product, i) => (
              <button className="dropdown-item" key={i} type="button">
                {product.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
