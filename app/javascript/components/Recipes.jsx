import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Recipes = ()=>{
  const [recipes, setRecipes] = useState()

  useEffect(()=>{
    const url = "/api/v1/recipes/index";
    if(!recipes){
      fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setRecipes(response))
      .catch((err) => console.log(err))//this.props.history.push("/"));
      
    }

  }, [recipes, setRecipes]) 
  return(
   <>
    <section className="jumbotron jumbotron-fluid text-center">
      <div className="container py-5">
        <h1 className="display-4">Recipes for every occasion</h1>
        <p className="lead text-muted">
          We’ve pulled together our most popular recipes, our latest
          additions, and our editor’s picks, so there’s sure to be something
          tempting for you to try.
        </p>
      </div>
    </section>
    <div className="py-5">
      <main className="container">
        <div className="text-right mb-3">
          <Link to="/recipe" className="btn custom-button">
            Create New Recipe
          </Link>
        </div>
        <div className="row">
        
        {recipes && recipes.map((recipe, idx)=> (
              <div key={idx} className="col-md-6 col-lg-4">
              <div className="card mb-4">
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={`${recipe.name} image`}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <Link to={`/recipe/${recipe.id}`} className="btn custom-button">
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ) 
        )}

        {!recipes && (
          <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
              No recipes yet. Why not <Link to="/new_recipe">create one</Link>
            </h4>
          </div>
        )}

        </div>
        <Link to="/" className="btn btn-link">
          Home
        </Link>
      </main>
    </div>
   </>
  )
}
export default Recipes;