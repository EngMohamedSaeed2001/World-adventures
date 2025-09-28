import CountryComp from "./CountryComp";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import styles from "./CountryListComp.module.css";
import { useCities } from "../../Contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => {
        return <CountryComp country={country} key={i} />;
      })}
    </ul>
  );
}

export default CountryList;
