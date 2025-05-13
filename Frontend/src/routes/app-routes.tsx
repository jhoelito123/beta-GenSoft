import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from '../components/ui/home';
import NavbarLayout from '../layouts/navbar-layout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/register-inst-educational"
            element={<RegisterInstEdu />}
          />
          <Route path="/register-teacher" element={<RegisterTeacher />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
