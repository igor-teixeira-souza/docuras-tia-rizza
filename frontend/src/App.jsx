import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./pages/client/Menu";
import Cart from "./pages/client/Cart";
import Checkout from "./pages/client/Checkout";

import OrderDashboard from "./pages/admin/OrderDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SITE DO CLIENTE */}

        <Route path="/" element={<Menu />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        {/* PAINEL ADMIN */}

        <Route path="/admin" element={<OrderDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
