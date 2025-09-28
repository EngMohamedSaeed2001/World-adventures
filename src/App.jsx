import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import NotFound from "./pages/NotFound/NotFound";
import AppLayout from "./pages/AppLayout/AppLayout";

import CityList from "./Components/CityListComp/CityListComp";
import City from "./Components/City/City";
import CountryList from "./Components/CountryComp/CountryListComp";
import Form from "./Components/Form/Form";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectRoutes from "./Pages/ProtectRoutes";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />

            <Route
              path="app"
              element={
                <ProtectRoutes>
                  <AppLayout />
                </ProtectRoutes>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />

              <Route path="cities/:id" element={<City />} />

              <Route path="countries" element={<CountryList />} />

              <Route path="form" element={<Form />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
