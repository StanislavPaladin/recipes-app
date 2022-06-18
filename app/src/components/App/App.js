import { BrowserRouter, Route, Routes } from "react-router-dom";


import routesConfig from "../../routes/routesConfig"
// rc-tooltip-styles
import 'rc-tooltip/assets/bootstrap_white.css';
// react-notification styles
import 'react-notifications/lib/notifications.css';

import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
    <BrowserRouter>
				
				<Routes>
					{routesConfig.map((route, index) => (
						<Route
							path={route.path}
							key={index}
							element={route.element}
							exact={route.exact}
						/>
					))}
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;

