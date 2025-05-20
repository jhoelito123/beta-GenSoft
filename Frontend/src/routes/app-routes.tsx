import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from '../components/ui/home';
import NavbarLayout from '../layouts/navbar-layout';
import RegisterInstPage from '../features/registrations/pages/register-educational-institution';
import { RegisterCoursePage } from '../features/courses/pages/register-course';
import RegisterTeacherPage from '../features/registrations/pages/register-teacher';

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
          <Route path="/register-course" element={<RegisterCoursePage />} />
          <Route path="/register-teacher" element={<RegisterTeacherPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
