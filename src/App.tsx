import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import HRPage from './pages/HRPage';
import MedicalPage from './pages/MedicalPage';
import FinancePage from './pages/FinancePage';
import FoodPage from './pages/FoodPage';
import EducationPage from './pages/EducationPage';
import ManufacturingPage from './pages/ManufacturingPage';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hr" element={<HRPage />} />
          <Route path="/medical" element={<MedicalPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/manufacturing" element={<ManufacturingPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App
