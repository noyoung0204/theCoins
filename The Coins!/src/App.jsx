import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) =>  {
        setCoins(json)
        setLoading(false);
      });
  }, []);

  const onSubmit = (event) => {
  event.preventDefault();
  setFilteredCoins(coins.filter(coin => coin.quotes.USD.price <= price).sort((a, b) => b.quotes.USD.price - a.quotes.USD.price)); //이 코드라인을 보면서 생각합시다 React는 state중심이란걸 정확하게 압시다. 결과를 직접 만드는것이 아닌 상태를 바꾸면 React가 알려주는 선언형 방식인 React에선 State는 항상 중요하다는걸 간과하지 말아야합니다.
}

  const onChange = (event) => {
    setPrice(event.target.value);
  }

  return (
    <div> 
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loding...</strong> : <select>
        {coins.map((coin) => <option>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD </option>)}
      </select>}
      <form onSubmit={onSubmit}>
      <input type="number" value={price} placeholder="price" onChange={onChange}></input>
      <button type="submit">lookUpCoin</button>
      </form>
      <ul>
        {filteredCoins.map((coin) => (
          <li>{coin.name}: ${coin.quotes.USD.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
