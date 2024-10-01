import { Outlet } from 'react-router-dom';
import GNB from '../components/GNB';

function App() {
	return (
		<>
			<GNB />
			<div>
				<Outlet />
			</div>
		</>
	);
}

export default App;
