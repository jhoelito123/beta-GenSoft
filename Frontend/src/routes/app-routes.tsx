import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from '../components/ui/home';
import NavbarLayout from '../layouts/navbar-layout';
import RegisterInstPage from '../features/registrations/pages/register-educational-institution';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/register-inst-educational"
            element={<RegisterInstPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
