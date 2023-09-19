/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();
const URL = "http://localhost:8000/cities";

//Context states in useReducer

const reducer = function (state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      throw new Error("Unknown action");
  }
};

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);

        const res = await fetch(URL);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Something went wrong" });
        // } finally {
        //   setIsLoading(false);
        // }
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      //setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Something went wrong" });
      // } finally {
      //   setIsLoading(false);
      // }
    }
  }

  async function createCity(newCity) {
    //dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      //setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch {
      // dispatch({ type: "rejected", payload: "Something went wrong" });
      alert("smth went wrong");
      // } finally {
      //   setIsLoading(false);
      // }
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
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "Something went wrong" });
      // } finally {
      //   setIsLoading(false);
      // }
    }
  }
  console.log(cities);
  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        currentCity: currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
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
