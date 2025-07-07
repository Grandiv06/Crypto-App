import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { BeatLoader } from "react-spinners";
import { marketChart } from "../../services/cryptoApi";
import styles from "./TableCoin.module.css";

function TableCoin({ coins, loading, setChart }) {
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loaderWrapper}>
          <BeatLoader color="#139f02" size={37} />
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Totol Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow key={coin.id} coin={coin} setChart={setChart} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default TableCoin;

const TableRow = ({ coin, setChart }) => {
  const {
    id,
    name,
    image,
    current_price,
    total_volume,
    price_change_percentage_24h: price_change,
    symbol,
  } = coin;
  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      console.log(json);
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };
  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>${current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt="" />
      </td>
    </tr>
  );
};
