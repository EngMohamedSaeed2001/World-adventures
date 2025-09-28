// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import styles from "./Form.module.css";
import BackButton from "../Button/BackButton";
import Button from "../Button/Button";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import { useCities } from "../../Contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
function Form() {
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCityData() {
      try {
        setError("");
        setIsCityLoading(true);
        const res = await fetch(`${URL}latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That does'nt seem to be a city. click somewhere else"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsCityLoading(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;
    const newCity = {
      cityName: cityName,
      country: country,
      emoji: emoji,
      date: date,
      notes: notes,
      position: {
        lat: lat,
        lng: lng,
      },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }
  if (!lat || !lng)
    return <Message message="Please click somewhere on the map" />;
  if (error) return <Message message={error} />;
  if (isCityLoading) return <Spinner />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to {cityName} / {country}
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
