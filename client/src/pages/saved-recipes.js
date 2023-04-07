import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1738/recipes/savedRecipes/${userID}`,
          { userID }
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedRecipe();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      {savedRecipes?.length ? (
        <ul>
          {savedRecipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <div className='instructions'>
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved recipes yet.</p>
      )}
    </div>
  );
};
