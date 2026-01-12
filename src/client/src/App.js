import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminNavigation from "./components/Admin/AdminNavigation";
import { useLocation } from "react-router-dom";
import AdminOrder from "./pages/Admin/AdminOrder";
import AdminCustomer from "./pages/Admin/AdminCustomer";
import About from "./pages/About"
import Cookies from "js-cookie";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isAdminDashboardRoute, setIsAdminDashboardRoute] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token"); // Thay đổi từ localStorage sang Cookies
    setIsAuthenticated(!!token);
  }, []);

  const isAdminRoute = currentPath.startsWith("/admin");
  const isAdminDashboardRoute = currentPath.startsWith("/admin/dashboard");


  return (
    <div className="App">
      {isAdminRoute ? null : <Header />}
      {isAdminDashboardRoute ? <AdminNavigation /> : null}
      {/* {isAdminDashboardRoute ? <AdminHeader /> : null} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:name" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Navigate to="/admin/dashboard" replace={true} />
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin" replace={true} />
            )
          }
        />
        <Route 
          path="/admin/dashboard/order/:page"
          element={
            isAuthenticated ? (
              <AdminOrder />
            ) : (
              <Navigate to="/admin" replace={true} />
            )
          }
        />
         <Route 
          path="/admin/dashboard/customer/:page"
          element={
            isAuthenticated ? (
              <AdminCustomer />
            ) : (
              <Navigate to="/admin" replace={true} />
            )
          }
        />
      
        <Route
          path="/admin/dashboard/products/:page"
          element={
            isAuthenticated ? (
              <AdminProducts />
            ) : (
              <Navigate to="/admin" replace={true} />
            )
          }
        />
      </Routes>
      {isAdminRoute ? null : <Footer />}
    </div>
  );
}

export default App;
