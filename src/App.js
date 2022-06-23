import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './movie/movieList';
import MovieListHeading from'./movie/movieListHeading';
import SearchBox from './search/searchBox';
import AddFavorites from "./favorite/addFavorites";
import RemoveFavorites from './favorite/removeFavorites';

function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState([])

  const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;  
    
    const response = await fetch(url)
    const responseJson = await response.json()

    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {

    if (!localStorage.getItem('react-movie-app-favorites')){
      localStorage.setItem('react-movie-app-favorites', JSON.stringify([]))
    }

    const movieFavorites = JSON.parse(
      localStorage.getItem('react-movie-app-favorites')
    )

    setFavorites(movieFavorites)
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
  }
    
  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie]
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    )
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row align-items-center my-4'>
        <MovieListHeading heading='Movies'></MovieListHeading>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}></SearchBox>
      </div>
      <div className='row'>
        <MovieList 
          movies={movies} 
          favoriteComponent={AddFavorites}
          handleFavoritesClick={addFavoriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center my-4'>
        <MovieListHeading heading='Favorites' />
      </div>
      <div className='row'>
        <MovieList 
          movies={favorites}
          handleFavoritesClick={removeFavoriteMovie} 
          favoriteComponent={RemoveFavorites} 
        />
      </div>
    </div>
  );
}

export default App;
