
import React, { useEffect,useState } from 'react'
import Search from './components/Search'

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
  const copper_url = `https://www.alphavantage.co/query?function=COPPER&interval=monthly&apikey=${API_KEY}`;

  const get_copper_daily = async () => {
        try {
         const response = await fetch(copper_url,API_OPTIONS);
         if (response.ok){
         const data = await response.json();
              if (data.response === 'False'){
                  setErrorMessage(data.Error || "failed to fetch data");
              } else {
                console.log(data.name);
                alert(data.name);
              }  
         } else {
          throw new Error("The response was not ok");
         }
        } catch (error) {
            console.log(`error getting copper daily: ${error}`)
            setErrorMessage("error in getting copper data, please try again later");
        }
  }

  useEffect(() => {
    get_copper_daily();
  },[])

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
          <h2>
            All movies
          </h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </section>
      </div>
      <div className="bg-white text-black px-4 py-2 rounded">
        <button>register</button>
      </div>
    </main>
    
  )
}

export default App