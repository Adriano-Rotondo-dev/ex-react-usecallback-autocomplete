const debounce = (callback, delay) => {
  let timeout;
  return (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

import { useState, useEffect, useCallback } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  console.log(suggestions);

  const fetchProducts = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3333/products?search=${query}`);
      const data = await res.json();
      setSuggestions(data);
      console.log("HERE");
    } catch (error) {
      console.error(error);
    }
  };

  //debounce
  const debounceFetch = useCallback(debounce(fetchProducts, 3000), []);

  useEffect(() => {
    debounceFetch(query);
  }, [query, debounceFetch]);

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
