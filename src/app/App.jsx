import { Outlet } from 'react-router-dom';
import GNB from '../components/GNB.jsx';
import styles from '../components/Pagination.module.css';

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
