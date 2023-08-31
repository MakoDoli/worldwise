/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
export default function CountriesList({ cities, isLoading }) {
  console.log(cities);
  if (isLoading) return <Spinner />;
  if (!cities.length) {
    return <Message message={"Add your first city by clicking on map"} />;
  }

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        // eslint-disable-next-line react/jsx-key
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
