
import React, { useEffect,useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import CandleStick from './components/CandleStick';

const BASE_URL = "https://www.alphavantage.co/";

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm ,setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [candleList, setCandleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const copper_url = `https://www.alphavantage.co/query?function=COPPER&interval=monthly&apikey=${API_KEY}`;
  const aluminium_url = `https://www.alphavantage.co/query?function=ALUMINUM&interval=monthly&apikey=${API_KEY}`

  const get_copper_daily = async ( query = "" ) => {
    setIsLoading(false);
    setErrorMessage("");
    setCandleList([]);
        try {
          const endpoint = query ? aluminium_url : copper_url;
         const response = await fetch(endpoint,API_OPTIONS);
         if (response.ok){
         const data = await response.json();
              if (data.response === 'False'){
                  setErrorMessage(data.Error || "failed to fetch data");
                  setCandleList([]);
              } else if(data.data) {
                console.log(data.name);
                alert(data.name);
                setCandleList(data.data);
              } else {
                setErrorMessage(`unexpected API Response format ${data.Information}`);
                console.log("sdqf");
                console.log(data);
                setCandleList([]);
              }
         } else {
          throw new Error("The response was not ok");
         }
        } catch (error) {
            console.log(`error getting copper daily: ${error}`)
            setErrorMessage("error in getting copper data, please try again later");
        } finally {
          setIsLoading(false);
        }
  }

  useEffect(() => {
    get_copper_daily(searchTerm);
  },[searchTerm])

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> that you will enjoy</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>

        </header>
        <section className="all-movies">
          <h2 className='mt-[40px]'>
            All movies
          </h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
             <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {candleList.map((candle) => (
                <CandleStick key={candle.date} candle={candle}/>
              ))}
            </ul>
          )}
          </section>
      </div>
      <div className="bg-white text-black px-4 py-2 rounded">
        <button>register</button>
      </div>
    </main>
    
  )
}

export default App