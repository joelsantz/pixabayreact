import React, { useState, useEffect } from 'react';
import Searcher from './components/Searcher';


function App() {

  const [search, setSearch] = useState('');

  useEffect (() => {

    const consultAPI = async () => {

      if(search === '') return;

      const imagesPerPage = 30;
      const apiKey = '13487812-feb0e49f2ee92d3aeb0a50a5a';


      const url = `https://pixabay.com/api/?key=${apiKey}&q=${search}&per_page=${imagesPerPage}`;

      const answer = await fetch(url);
      const result = await answer.json();

      console.log(result);

    }
    consultAPI();

  },[search]);

  return (
    <div className="App container">
      <div className = "jumbotron">
        <p className = "lead text-center">Pic Searcher!</p>

        <Searcher 
          setSearch = {setSearch}
        />


      </div>

      <div className = "row justify-content-center">

      </div>
    </div>
  );
}

export default App;
