import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";

import CityList from "./Components/CityListComp/CityListComp";
import City from "./Components/City/City";
import CountryList from "./Components/CountryComp/CountryListComp";
import Form from "./Components/Form/Form";
import SpinnerFullPage from "./Components/SpinnerFullPage/SpinnerFullPage";
import ProtectRoutes from "./Pages/ProtectRoutes";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Product = lazy(() => import("./pages/Product/Product"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
