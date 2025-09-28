import PropTypes from "prop-types";
import styles from "./CountryComp.module.css";
function CountryComp({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

CountryComp.propTypes = {
  country: PropTypes.shape({
    country: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
  }).isRequired,
};

export default CountryComp;
