export const CreateRecipe = () => {
  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form>
        <label htmlFor='Name'>Name</label>
        <input type='text' id='name' />
        <label htmlFor='description'>Description</label>
        <textarea id='description' name='description' />
        <label htmlFor='ingredients'>Ingredients</label>
        <label htmlFor='instructions'>Instructions</label>
        <textarea id='instructions' name='instructions' />
        <label htmlFor='imageUrl'>Image URL</label>
        <input type='text' id='imageUrl' name='imageUrl' />
        <label htmlFor='cookingTime'>Cooking Time (in minutes)</label>
        <input type='number' id='cookingTime' name='cookingTime' />
      </form>
    </div>
  );
};
