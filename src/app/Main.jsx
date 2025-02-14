import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import CompanyDetailPage from '../pages/CompanyDetailPage.jsx';
import CompanyListPage from '../pages/CompanyListPage.jsx';
import ComparisonResultPage from '../pages/ComparisonResultPage.jsx';
import ComparisonStatusPage from '../pages/ComparisonStatusPage.jsx';
import InvestmentStatusPage from '../pages/InvestmentStatusPage.jsx';
import MyComparisonPage from '../pages/MyComparisonPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import { UserProvider, useSetUser } from '../context/UserProvider.jsx';
import Profile from '../pages/Profile.jsx';
import LoginWithGoogle from '../pages/LoginWithGoogle.jsx';
import LoginWithKakao from '../pages/LoginWithKakao.jsx';

function Main() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />}>
						<Route index element={<LandingPage />} />
						<Route path="login" element={<LoginPage />} />
						<Route path="account/log-in-with-google" element={<LoginWithGoogle />} />
						<Route path="account/log-in-with-kakao" element={<LoginWithKakao />} />
						<Route path="signup" element={<SignupPage />} />
						<Route path="profile" element={<Profile />} />
						<Route path="companies">
							<Route index element={<CompanyListPage />} />
							<Route path=":companyId" element={<CompanyDetailPage />} />
						</Route>
						<Route path="comparison-status" element={<ComparisonStatusPage />} />
						<Route path="investment-status" element={<InvestmentStatusPage />} />
						<Route path="my-comparison">
							<Route index element={<MyComparisonPage />} />
							<Route path="result" element={<ComparisonResultPage />} />
						</Route>
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}

export default Main;
