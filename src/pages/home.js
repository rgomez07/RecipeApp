import { useEffect, useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(['access_token']);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:1738/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1738/recipes/savedRecipes/ids/${userID}`,
          { userID }
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();

    if (cookies.access_token) fetchSavedRecipe();
  }, []);
  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        'http://localhost:1738/recipes',
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };
  const isRecipeSaved = (id) => savedRecipes && savedRecipes.includes(id);

  return (
    <div>
      <h1 className='homeTitle'>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id} className='list1'>
            <div>
              <div className='buttonAlign'>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
                </button>
              </div>
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
    </div>
  );
};
