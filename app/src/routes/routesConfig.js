import RecipesList from "../components/RecipesList";
import AddNewRecipe from "../components/AddNewRecipe";
import RecipePage from "../components/RecipePage";


const routesConfig = [
    {
		path: "/",
		exact: true,
		element: <RecipesList />,
	},
	{
		path: "/add",
		exact: true,
		element: <AddNewRecipe />,
	},
	{
		path: "/detail/:id",
		exact: false,
		element: <RecipePage />,
	},

]

export default routesConfig;