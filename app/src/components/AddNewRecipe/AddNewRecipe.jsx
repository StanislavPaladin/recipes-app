import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createNotification } from "../../utils/createNotification";
import { v4 as uuidv4 } from "uuid";
import { NotificationContainer } from "react-notifications";
import { URL, PORT, RECIPES } from "../../constants/constants";

import styles from "./AddNewRecipe.module.css";

const AddNewRecipe = () => {
	const navigate = useNavigate();
	const uuid = uuidv4();
	const axios = require("axios").default;

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [directions, setDirections] = useState("");
	const [prepTime, setPrepTime] = useState("");
	const [cookTime, setCookTime] = useState("");
	const [servings, setServings] = useState("");
	const [passedValidate, setPassedValidate] = useState(false);
	const [recipe, setRecipe] = useState(null);

	const [ingredientsToSave, setIngredientsToSave] = useState([]);
	const [directionsToSave, setDirectionsToSave] = useState([]);

	const handleGoBack = (e) => {
		e?.preventDefault();
		navigate(-1);
	};

	const parseDirections = () => {
		const arr = [];
		directions?.split("\n").forEach((line) => {
			let optional = false;
			if (line.search(/optional/i) !== -1) {
				line.replace(/optional/i, "");
				optional = true;
			}
			arr.push({
				instructions: line,
				optional,
			});
		});
		setDirectionsToSave(arr);
	};

	const parseIngredients = () => {
		const arr = [];
		ingredients?.split("\n").forEach((line) => {
			const details = line.split(" ");
			arr.push({
				uuid: uuidv4(),
				amount: Number.parseFloat(details[0]),
				measurement: details[1],
				name: details[2],
			});
		});
        setIngredientsToSave(arr);
	};

	const getRecipeSaved = () => {
		saveRecipe();
        console.log('recipe', recipe)
		recipe &&
			axios
				.post(URL + PORT + RECIPES, recipe)
				.then(function (response) {
					console.log(response);
					createNotification(
						"success",
						` success`,
						`${title}  saved`
					);
				})
				.catch(function (error) {
					console.log(error);
				});
		setTimeout(handleGoBack, 1000);
	};

	const saveRecipe = () => {
		setRecipe({
			uuid: uuidv4(),
			title: title,
			description: description,
			ingredients: ingredientsToSave,
			directions: directionsToSave,
			images: {
				small: "",
				medium: "",
				full: "",
			},
			postDate: new Date(),
			editDate: new Date(),
		});
	};

	useEffect(() => {
        saveRecipe();
		title &&
		description &&
		ingredients &&
		directions &&
		prepTime &&
		cookTime &&
		servings
			? setPassedValidate(true)
			: setPassedValidate(false);
	}, [
		title,
		description,
		ingredients,
		directions,
		prepTime,
		cookTime,
		servings,
	]);

	useEffect(() => {
		parseIngredients();
	}, [ingredients]);
	useEffect(() => {
		parseDirections();
	}, [directions]);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Add Recipe</h1>
			<div className={styles.content}>
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "35ch" },
					}}
					noValidate
					autoComplete="off"
				>
					<div>
						<TextField
							id="title"
							label="Recipe title"
							value={title}
							rows={1}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						<TextField
							id="description"
							label="Description"
							multiline
							rows={4}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div>
						<TextField
							id="ingredients"
							label="Ingredients"
							multiline
							rows={4}
							value={ingredients}
							onChange={(e) => setIngredients(e.target.value)}
						/>
					</div>
					<div>
						<TextField
							id="directions"
							label="Directions"
							multiline
							rows={4}
							value={directions}
							onChange={(e) => setDirections(e.target.value)}
						/>
					</div>
				</Box>
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": {
							m: 1,
							width: "355 ch",
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "flex-start",
							flexDirection: "column",
						},
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						type="number"
						min={0}
						id="prepTime"
						label="Prep Time"
						value={prepTime}
						rows={1}
						onChange={(e) => setPrepTime(e.target.value)}
					/>
					<TextField
						type="number"
						min={0}
						id="cookTime"
						label="Cook Time"
						value={cookTime}
						rows={1}
						onChange={(e) => setCookTime(e.target.value)}
					/>
					<TextField
						type="number"
						min={0}
						inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
						id="servings"
						label="Servings"
						value={servings}
						rows={1}
						onChange={(e) => setServings(e.target.value)}
					/>
				</Box>
			</div>
			<div className={styles.btn__wrapper}>
				<a href="/" onClick={handleGoBack} className={styles.linkBack}>
					<Button
						variant="outlined"
						sx={{ width: 120, height: 70, cursor: "pointer" }}
					>
						Back
					</Button>
				</a>

				<Button
					disabled={!passedValidate}
					sx={{ width: 120, height: 70, cursor: "pointer" }}
					variant="contained"
					onClick={getRecipeSaved}
				>
					Save
				</Button>
			</div>
			<NotificationContainer leaveTimeout={200} enterTimeout={200} />
		</div>
	);
};

export default AddNewRecipe;
