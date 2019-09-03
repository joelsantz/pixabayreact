import React, { useState, useEffect } from 'react';
import Searcher from './components/Searcher';
import ImagesList from './components/ImagesList';


function App() {

  const [search, setSearch] = useState('');
  const [ images, setImages ] = useState([]);
  const [ actualPage, setActualPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1);

  useEffect (() => {

    const consultAPI = async () => {

      if(search === '') return;

      const imagesPerPage = 30;
      const apiKey = '13487812-feb0e49f2ee92d3aeb0a50a5a';


      const url = `https://pixabay.com/api/?key=${apiKey}&q=${search}&per_page=${imagesPerPage}&page=${actualPage}`;

      const answer = await fetch(url);
      const result = await answer.json();

      setImages(result.hits);

      // Calcular el total de paginas
      const calculateTotalPages = Math.ceil( result.totalHits / imagesPerPage )
      setTotalPages(calculateTotalPages);

      // Mover la pantalla hacia la parte superior
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth', block: 'end'});
      

    }
    consultAPI();

  },[search, actualPage]);

  const previousPage = () => {
    let newActualPage = actualPage -1;

    // colocarlo en el state

    setActualPage(newActualPage);
  }

  const nextPage = () => {

    let newActualPage = actualPage + 1;

    // colocarlo en el state

    setActualPage(newActualPage);

  }

  return (
    <div className="app container">
      <div className = "jumbotron">
        <p className = "lead text-center">FIND YOUR FAVORITES PICS🖤!</p>

        <Searcher 
          setSearch = {setSearch}
        />


      </div>

      <div className = "row justify-content-center">
          <ImagesList 
            images = {images}
          />
          { (actualPage === 1 ) ? null : (
              <button onClick = {previousPage} type = "button" className = "btn btn-info mr-1">&laquo; Previous</button>
          )}
          
          { (actualPage === totalPages ) ? null : ( 
              <button onClick = {nextPage} type = "button" className = "btn btn-info">Next &raquo;</button>
          )}
          
      </div>
    </div>
  );
}

export default App;
