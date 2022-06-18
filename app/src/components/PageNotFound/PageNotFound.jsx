import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const PageNotFound = () => {
    const navigate=useNavigate();
    const handleGoBack = (e) => {
		e.preventDefault();
		navigate(-1);
	};
    return (
        <div className={styles.container}>
            <h1>Page not found</h1>
            <a
						href="/"
						onClick={handleGoBack}
						className={styles.linkBack}
					>
						<Button variant="outlined">Go back</Button>
					</a>
        </div>
    );
}

export default PageNotFound;
