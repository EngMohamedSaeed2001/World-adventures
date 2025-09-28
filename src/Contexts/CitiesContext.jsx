import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const URL = "http://localhost:9000/";

const initial = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
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
        cities: [...state.cities.filter((city) => city.id !== action.payload)],
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("UNKOWN TYPE");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initial
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    async function fetchData() {
      try {
        const res = await fetch(`${URL}cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "Error occurs when cities loaded",
        });
      }
    }

    fetchData();
  }, []);

  async function getCity(id) {
    if (Number(id) === createCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: "Error occurs when city loaded" });
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: "Error occurs when city created" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL}cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: "Error occurs when city deleted" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
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
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("The context is used outside the CitiesProvider");
  return context;
}
export { CitiesProvider, useCities };

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
