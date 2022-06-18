import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import TooltipPage from "../TooltipPage/Tooltip";
import React, { useEffect, useState } from "react";
import { URL, PORT, RECIPES, SPECIALS } from "../../constants/constants";
import { Button } from "@mui/material";

import styles from "./RecipePage.module.css";

const RecipePage = () => {
	const id = useParams().id;
	const navigate = useNavigate();

	const handleGoBack = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	const [recipe, setRecipe] = useState(null);
	const [posted, setPosted] = useState(null);
	const [edited, setEdited] = useState(null);
	const [promo, setPromo] = useState(null);

	const {
		cookTime,
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
		try {
			const res = await getApiResource(url); 
			res && setRecipe(res);
		} catch (err) {
			console.log("error", err);
		}
	};
	const handleDate = (date) => {
		const newDate = date.split(" ");
		if (newDate[0].includes("T")) {
			const replacedData = newDate[0].split("T");
			const getDayMonthYear = replacedData[0].split("-");
			const month = getDayMonthYear[1];
			const monthsName = monthsArray[month - 1];
			const day = getDayMonthYear[0];
			const year = getDayMonthYear[2];
			return day + " " + monthsName + " " + year;
		} else {
			const getDayMonthYear = newDate[0].split("/");
			const month = getDayMonthYear[0];
			const monthsName = monthsArray[month - 1];
			const day = getDayMonthYear[1];
			const year = getDayMonthYear[2];
			return day + " " + monthsName + " " + year;
		}
	};

	useEffect(() => {
		getRecipeResponse(URL + PORT + RECIPES + id);
		postDate && setPosted(handleDate(postDate));
		(async function () {
			const res = await getApiResource(URL + PORT + SPECIALS);
			return await setPromo(res);
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		postDate && setPosted(handleDate(postDate));
		editDate && setEdited(handleDate(postDate));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postDate, editDate]);

	return (
		<div className={styles.container}>
			{recipe && (
				<>
					<a
						href="/"
						onClick={handleGoBack}
						className={styles.linkBack}
					>
						<Button variant="outlined">Go back</Button>
					</a>
					<div className={styles.title}>{title}</div>
					<div className={styles.dates}>
						<div className={styles.postDate}>Posted: {posted}</div>
						<div className={styles.editDate}>Edited: {edited}</div>
					</div>
					<div className={styles.description}>{description}</div>
					<div className={styles.image}>
						{images.small.length ? (
							<img src={images.medium} alt={title} />
						) : (
							<img src="/img/No-Image.jpg" alt={title} />
						)}
					</div>
					<div className={styles.info}>
						<div className={styles.info__servings}>
							Servings: {servings}
						</div>
						<div className={styles.info__prepTime}>
							Preparation time: {prepTime} min
						</div>
						<div className={styles.info__cookTime}>
							Cook time: {cookTime} min
						</div>
					</div>
					<div className={styles.main}>
						<div className={styles.main__ingredients}>
							<h1 className={styles.ingredients__title}>
								Ingredients
							</h1>
							<ul className={styles.ingredients__list}>
								{ingredients&&ingredients?.map(
									({ amount, measurement, name, uuid }) => {
										return (
											<li
												key={uuid}
												className={
													styles.ingredients__item
												}
											>
												<span className={styles.step}>
													{amount} {measurement}
												</span>{" "}
												{promo
													?.map(
														(item) =>
															item.ingredientId ===
															uuid
													)
													.includes(true) ? (
													<TooltipPage
														name={name}
														tooltip={
															promo &&
															promo.find(
																(item) =>
																	item.ingredientId ===
																	uuid
															)
														}
													/>
												) : (
													name
												)}
											</li>
										);
									}
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
