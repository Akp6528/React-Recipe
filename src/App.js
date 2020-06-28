import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const APP_ID = "4768fc1f";
  const APP_KEY = "04f5293ff61d70414d360d9f072a1c12";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  // useEffect( () => {
  //   getRecipes();  
  // }, [query]);

  // const getRecipes = async () => {
  //   const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  //   const data = await response.json();
  //   setRecipes(data.hits);
  //   console.log(data.hits);
  // }

  useEffect( () => {
    const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }
  getRecipes();
}, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  
  
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
        className="search-bar" 
        value={search} 
        type="text" 
        onChange={updateSearch}
        placeholder="Search Your favourite Dish Recipe Here ...."
        />
        <button className="search-button" type="submit">
          Search
          </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}


export default App;
