
import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {

  const [searchTerm ,setSearchTerm] = useState("");
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> that you will enjoy</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
        <h1 className='text-white'>{searchTerm}</h1>
      </div>
      <div className="bg-white text-black px-4 py-2 rounded">
        <button>register</button>
      </div>
    </main>
    
  )
}

export default App