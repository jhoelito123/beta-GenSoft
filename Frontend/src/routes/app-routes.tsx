import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from '../features/home/home';
import NavbarLayout from '../layouts/navbar-layout';
import RegisterInstPage from '../features/registrations/pages/register-educational-institution';
import { RegisterCoursePage } from '../features/courses/pages/register-course';
import RegisterTeacherPage from '../features/registrations/pages/register-teacher';
import { RegisterSectionCoursePage } from '../features/courses/pages/register-section-course';
import CoursesPage from '../features/courses/pages/courses';
import ShowCoursePage from '../features/courses/pages/show-course';
import Ejecutor from '../TestExecute';
import ShowSectionPage from '../features/courses/pages/show-section';

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
          <Route path="/register-teacher" element={<RegisterTeacherPage />} />
          <Route path="/register-course" element={<RegisterCoursePage />} />
          <Route
            path="/register-section-course"
            element={<RegisterSectionCoursePage />}
          />
          <Route path="/course" element={<CoursesPage />} />
          <Route path="/show-course/:id" element={<ShowCoursePage />} />
          <Route path="/show-section" element={<ShowSectionPage />} />
          <Route path="/code-editor" element={<Ejecutor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
