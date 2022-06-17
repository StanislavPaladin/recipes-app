import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { URL, PORT, RECIPES } from "../../constants/constants";

import styles from "./RecipePage.module.css";

const RecipePage = () => {
	const id = useParams().id;
	const [recipe, setRecipe] = useState(null);
	const [posted, setPosted] = useState(null);
	const [edited, setEdited] = useState(null);
	const {
		cookTime,
		uuid,
		description,
		directions,
		editDate,
		images,
		ingredients,
		postDate,
		prepTime,
		servings,
		title,
	} = recipe || {};

	const monthsArray = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

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

	const getRecipeResponse = async (url) => {
		const res = await getApiResource(url);
		res && setRecipe(res);
	};
	const handleDate = (date) => {
		const newDate = date.split(" ");
		const getDayMonthYear = newDate[0].split("/");
		const month = getDayMonthYear[0];
		const monthsName = monthsArray[month - 1];
		const day = getDayMonthYear[1];
		const year = getDayMonthYear[2];
		return day + " " + monthsName + " " + year;
	};

	useEffect(() => {
		getRecipeResponse(URL + PORT + RECIPES + id);
		postDate && setPosted(handleDate(postDate));
		console.log("posted", posted);
	}, []);

    useEffect(() => {
        postDate && setPosted(handleDate(postDate));
		console.log("posted", posted);
        editDate && setEdited(handleDate(postDate));
		console.log("edited", edited);
    },[postDate, editDate]);

	return (
		<div className={styles.container}>
			{recipe && (
				<>
					<div className={styles.title}>{title}</div>
					<div className={styles.dates}>
						<div className={styles.postDate}>Posted: {posted}</div>
						<div className={styles.editDate}>Edited: {edited}</div>
					</div>
					<div className={styles.description}>{description}</div>
					<div className={styles.image}>
						<img src={images.medium} alt={title} />
					</div>
					<div className={styles.info}>
						<div className={styles.info__servings}>
							Servings: {servings}
						</div>
						<div className={styles.info__prepTime}>
							Preparation time: {prepTime}
						</div>
						<div className={styles.info__cookTime}>
							Cook time: {cookTime}
						</div>
					</div>
					<div className={styles.main}>
						<div className={styles.main__ingredients}>
							<h1 className={styles.ingredients__title}>
								Ingredients
							</h1>
							<ul className={styles.ingredients__list}>
								{ingredients?.map(
									({ amount, measurement, name, uuid }) => (
										<li
											key={uuid}
											className={styles.ingredients__item}
										>
											<span className={styles.step}>{amount} {measurement}</span>
											{" "}{name}
										</li>
									)
								)}
							</ul>
						</div>
						<div className={styles.main__directions}>
							<h1 className={styles.directions__title}>
								Directions
							</h1>
							<ul className={styles.directions__list}>
								{directions?.map((item, idx) => (
									<li
										key={idx}
										className={styles.directions__item}
									>
										<span className={styles.step}>
											Step {idx}{" "}
										</span>
										{item.optional ? (
											<>(Optional) {item.instructions}</>
										) : (
											<>{item.instructions}</>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default RecipePage;
