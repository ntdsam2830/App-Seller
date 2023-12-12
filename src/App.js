import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Orders from "./pages/Orders";
import Productlist from "./pages/Productlist";
import Addproduct from "./pages/Addproduct";
import { getAuthUser } from "./utils/authStorage";
import ProductItem from "./pages/ProductItem";
function App() {
  const user = getAuthUser();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="reset-password" element={<Resetpassword />} />
        <Route path="forgot-password" element={<Forgotpassword />} />
        {user && (
          <Route path="admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="list-product" element={<Productlist />} />
            <Route path="product" element={<Addproduct />} />
            <Route path="list-product/:id" element={<ProductItem />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
