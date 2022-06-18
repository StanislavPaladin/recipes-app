import RecipesList from "../components/RecipesList";
import AddNewRecipe from "../components/AddNewRecipe";
import RecipePage from "../components/RecipePage";
import PageNotFound from "../components/PageNotFound";


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
	{
		path: "*",
		exact: false,
		element: <PageNotFound />,
	},

]

export default routesConfig;