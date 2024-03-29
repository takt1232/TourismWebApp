import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import HomePage from "scenes/homePage";
import AdminPage from "scenes/adminPage";
import ServicesPage from "scenes/ServicesPage";
import AdminLoginPage from "scenes/adminLoginPage";
import ProtectedRoute from "ProtectedRoutes";
import BookingPage from "scenes/bookingPage.jsx";
import CartPage from "scenes/cartPage";
import AdminViewServicePage from "scenes/adminViewServicePage";
import AdminManageUser from "scenes/adminManageUserPage";
import AdminManageCheckOutPage from "scenes/adminManageCheckOutPage";
import ViewCheckoutPage from "scenes/viewCheckout";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isAuth = Boolean(useSelector((state) => state.token));
  const role = useSelector((state) => state.user?.role);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/booking/:serviceId" element={<BookingPage />} />
            <Route path="/shopping/cart" element={<CartPage />} />
            <Route path="/checkout" element={<ViewCheckoutPage />} />
            <Route element={<ProtectedRoute role={role} isAuth={isAuth} />}>
              <Route path="/manage/services" element={<AdminPage />} />
              <Route
                path="/admin/booking/:serviceId"
                element={<AdminViewServicePage />}
              />
              <Route path="/manage/user" element={<AdminManageUser />} />
              <Route
                path="/manage/checkout"
                element={<AdminManageCheckOutPage />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
