import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const URL = "http://localhost:8000/cities";
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(URL);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }

    // axios
    //   .post(URL, newCity)
    //   .then((response) => {
    //     if (response.status === 201) {
    //       setCities((cities) => [...cities, response]);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        currentCity: currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const contextValueStates = useContext(CitiesContext);
  if (contextValueStates === undefined)
    throw new Error("CitiesContext was used outsied of CitiesProvider");
  return contextValueStates;
}

export { CitiesProvider, useCities };
