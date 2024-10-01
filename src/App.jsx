import GNB from "./components/GNB";
import { Outlet } from "react-router-dom";
import styles from "./components/Pagination.module.css";

function App() {
	return (
		<>
			<GNB />
			<main className={styles.main}>
				<Outlet />
			</main>
		</>
	);
}

export default App;
