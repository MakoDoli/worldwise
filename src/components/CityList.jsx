/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
export default function CityList({ cities, isLoading }) {
  console.log(cities);
  if (isLoading) return <Spinner />;
  if (!cities.length) {
    return <Message message={"Add your first city by clicking on map"} />;
  }
  return (
    <ul className={styles.cityLIst}>
      {cities.map((city) => (
        // eslint-disable-next-line react/jsx-key
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
