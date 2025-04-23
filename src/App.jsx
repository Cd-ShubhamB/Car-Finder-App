// Car Finder App
import React, { useState, useEffect } from "react";
import axios from "axios";

const mockAPI = "https://www.freetestapi.com/api/v1/cars";

const App = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
    fuel: "",
    seats: "",
    minPrice: "",
    maxPrice: "",
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const carsPerPage = 10;

  // Apply dark mode class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    axios
      .get(mockAPI)
      .then((res) => {
        if (Array.isArray(res.data)) {
          const mappedCars = res.data.map((car) => ({
            id: car.id,
            brand: car.make,
            name: car.model,
            year: car.year,
            color: car.color,
            mileage: car.mileage,
            price: car.price,
            fuel: car.fuelType,
            transmission: car.transmission,
            engine: car.engine,
            horsepower: car.horsepower,
            features: car.features,
            owners: car.owners,
            image: car.image,
            seats: "5 (est.)", // Default value if not provided
          }));
          setCars(mappedCars);
        } else {
          console.error("API did not return an array:", res.data);
          setCars([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch car data. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = cars.filter((car) => {
      const carPrice = parseFloat(car.price);
      return (
        (!filters.brand ||
          car.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
        (!filters.fuel ||
          car.fuel?.toLowerCase() === filters.fuel.toLowerCase()) &&
        (!filters.seats || car.seats === filters.seats) &&
        (!filters.minPrice || carPrice >= parseFloat(filters.minPrice)) &&
        (!filters.maxPrice || carPrice <= parseFloat(filters.maxPrice)) &&
        car.name.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (sort === "low")
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    if (sort === "high")
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

    setFilteredCars(filtered);
  }, [filters, search, sort, cars]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  const toggleWishlist = (car) => {
    let updated;
    if (wishlist.find((item) => item.id === car.id)) {
      updated = wishlist.filter((item) => item.id !== car.id);
    } else {
      updated = [...wishlist, car];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const displayedCars = filteredCars.slice(
    (page - 1) * carsPerPage,
    page * carsPerPage
  );

  return (
    <div
      className={`${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen transition-colors duration-300`}
    >
      <div className="p-4 max-w-screen-lg mx-auto">
        <div className={`flex justify-between items-center mb-4 ${darkMode ?"bg-gray-700" : "bg-violet-100"} p-4 rounded`}>
          <h1 className="text-2xl font-bold">Car Finder App 🚗</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:opacity-90 dark:bg-gray-200 dark:text-black"
          >
            {darkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

        {loading ? (
          <div className="text-center text-lg font-semibold py-10">
            Loading cars...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-semibold py-10">
            {error}
          </div>
        ) : (
          <>
          <div className={`p-4 rounded ${darkMode ?"bg-gray-700" : "bg-violet-100"}`}>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 p-4 rounded ${darkMode|| "bg-violet-100"}`}>
              <input
                type="text"
                placeholder="Search by car name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`p-2 border rounded ${darkMode ? "bg-gray-600 text-white border-gray-600" : "bg-white text-black" }`}
              />
              <input
                type="text"
                placeholder="Brand"
                onChange={(e) =>
                  setFilters({ ...filters, brand: e.target.value })
                }
                className={`p-2 border rounded ${darkMode ? "bg-gray-600 text-white border-gray-600" : "bg-white text-black" }`}
              />
              <select
                onChange={(e) =>
                  setFilters({ ...filters, fuel: e.target.value })
                }
                className={`p-2 border rounded ${darkMode ? "bg-gray-600 text-white border-gray-600" : "bg-white text-black" }`}
              >
                <option value="">Fuel</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
              <input
                type="number"
                placeholder="Seats"
                onChange={(e) =>
                  setFilters({ ...filters, seats: e.target.value })
                }
                className={`p-2 border rounded ${darkMode ? "bg-gray-600 text-white border-gray-600" : "bg-white text-black" }`}
              />
              <input
                type="number"
                placeholder="Min Price"
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                className={`p-2 border rounded ${darkMode ? "bg-gray-600 text-white border-gray-600" : "bg-white text-black" }`}
              />
              <input
                type="number"
                placeholder="Max Price"
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                className={`p-2 border rounded ${darkMode ? "bg-gray-600 text-white border-gray-600" : "bg-white text-black" }`}
              />
              <select
                onChange={(e) => setSort(e.target.value)}
                className={`p-2 border rounded ${darkMode ? "bg-gray-600 text-white border-gray-600" : "bg-white text-black" }`}
              >
                <option value="">Sort</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 p-4 rounded ${darkMode?"bg-gray-700" : "bg-violet-100"}`}>
              {displayedCars.length === 0 ? (
                <div className="text-center col-span-full bg-white text-gray-600 dark:text-gray-300 font-medium py-10">
                  No cars found matching your criteria.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {displayedCars.map((car) => (
                    <div
                      key={car.id}
                      className={`border p-4 rounded shadow-lg hover:scale-105 transition-transform duration-300 ${darkMode ? " bg-gray-800" :"bg-white"}`}
                    >
                      <img
                        src={
                          car.image ||
                          "https://dummyimage.com/300x200/ccc/000.jpg&text=No+Image"
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://dummyimage.com/300x200/ccc/000.jpg&text=No+Image";
                        }}
                        alt={car.name}
                        className="w-auto h-[40px] object-cover mb-2 rounded dark:brightness-90"
                      />
                      <h2 className="font-semibold text-lg">
                        {car.brand} {car.name}
                      </h2>
                      <p>
                        {car.year} • ₹{parseFloat(car.price).toLocaleString()}
                      </p>
                      <p>
                        {car.fuel || "N/A"}, {car.seats}
                      </p>
                      <button
                        onClick={() => toggleWishlist(car)}
                        className={`mt-2 ${darkMode? "bg-violet-700 ": "bg-pink-600"}  text-white font-semibold px-3 py-1 rounded hover:opacity-90 transition`}
                      >
                        {wishlist.find((w) => w.id === car.id)
                          ? "Remove from Wishlist"
                          : "Add to Wishlist🤍"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center mt-4 gap-2">
              {Array.from(
                { length: Math.ceil(filteredCars.length / carsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 border rounded transition-colors duration-200 ${
                      page === i + 1
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
            </div>

            <div className={`mt-6 p-4 rounded ${darkMode?"bg-gray-700" : "bg-violet-100"}`}>
              <h2 className="text-xl font-bold mb-2">Wishlist ❤️</h2>
              { (wishlist.length > 0) ?(
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {wishlist.map((car) => (
                  <div
                    key={car.id}
                    className={`border p-2 rounded text-sm font-semibold transition-colors duration-300 ${darkMode ? " bg-gray-800 text-white " :"bg-white  text-black"}`}
                  >
                    <img
                      src={car.image || "https://via.placeholder.com/150x100"}
                      alt={car.name}
                      className="w-full h-24 object-cover rounded"
                    />
                    <div className="mt-1">
                      {car.brand} {car.name}
                    </div>
                  </div>
                ))}
              </div>) : (<div className=" font-bold ">No Cars Wishlisted</div>) }
              </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
