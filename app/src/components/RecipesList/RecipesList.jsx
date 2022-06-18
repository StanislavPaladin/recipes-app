import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL, PORT, RECIPES } from "../../constants/constants";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";

import styles from "./RecipesList.module.css";

const RecipesList = () => {
	const [allRecipes, setAllrecipes] = useState(null);
	const getApiResource = async (url) => {
		try {
			const res = await fetch(url);
			if (!res.ok) {
				return false;
			}
			return await res.json();
		} catch (err) {
			console.error(err);
			return false;
		}
	};
	const getAllRecipes = async () => {
		const res = await getApiResource(URL + PORT + RECIPES);
			res&&setAllrecipes(res);
	};
	useEffect(() => {
		getAllRecipes();
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.tools}>
				<h1 className={styles.title}>Recipe list</h1>
				<Link  to={`/add`}>
				<Button
					sx={{ width: 150, height: 60, borderRadius: 3 }}
					variant="contained"
				>
					<div className={styles.btn__text}>Add recipe</div>
					<div className={styles.btn__plus}>+</div>
				</Button>
				</Link>
			</div>
			<ul className={styles.list}>
				{allRecipes ? (
					allRecipes.map(({ description, images, title, uuid }) => (
						<li key={uuid} className={styles.list__item}>
							<Link to={`/detail/${uuid}`}>
								<Card
									className="card"
									sx={{
										width: 200,
										backgroundColor: "rgba(75, 70, 102,.5)",
										backdropFilter: "blur(3px)",
										height: 200,
										borderRadius: 2,
										display: "flex",
										alignItems: "center",
										justifyContent: "flex-start",
										textAlign: "center",
									}}
								>
									<CardActionArea>
										{images.small.length ? (
											<CardMedia
												component="img"
												height="100"
												sx={{
													width: "90%",
													margin: "auto",
													height: 100,
													paddingTop: 1,
												}}
												image={images.small}
												alt={title}
											/>
										) : <CardMedia
										component="img"
										height="100"
										sx={{
											width: "90%",
											margin: "auto",
											height: 100,
											paddingTop: 1,
										}}
										image='/img/No-Image.jpg'
										alt={title}
									/>
										}
										<CardContent className="item__description">
											<Typography
												gutterBottom
												component="div"
												color="white"
												fontWeight={"bold"}
											>
												{title}
											</Typography>
											<Typography
												variant="body2"
												color="white"
												fontWeight={"normal"}
											>
												{description}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Link>
						</li>
					))
				) : (
					<span>No data</span>
				)}
			</ul>
		</div>
	);
};

export default RecipesList;
