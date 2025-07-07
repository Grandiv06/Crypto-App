import { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi";
import { BeatLoader } from "react-spinners";

import styles from "./Search.module.css";

function Search({ Currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (!text) {
      setLoading(false);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);
        if (json.coins) {
          setLoading(false);
          setCoins(json.coins);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name === !"AbortError") {
          alert(error.message);
        }
      }
    };
    setLoading(true);
    search();
    return () => controller.abort();
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={text}
        placeholder="Search"
        onChange={(e) => setText(e.target.value)}
      />
      <select value={Currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || loading) && (
        <div className={styles.searchResult}>
          {loading && <BeatLoader color="#139f02" size={25} />}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Search;
