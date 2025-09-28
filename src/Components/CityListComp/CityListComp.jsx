import CityComp from "../CityComp/CityComp";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import styles from "./CityListComp.module.css";

import { useCities } from "../../Contexts/CitiesContext";
function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityComp city={city} key={city.id} />;
      })}
    </ul>
  );
}

export default CityList;
