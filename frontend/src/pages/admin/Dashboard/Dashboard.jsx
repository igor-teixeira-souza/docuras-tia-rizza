import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { socket } from "../../../socket/socket";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadOrders();

    socket.on("newOrder", (order) => {
      setOrders((prev) => [order, ...prev]);
    });

    socket.on("orderUpdated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order,
        ),
      );
    });
  }, []);

  async function loadOrders() {
    const response = await api.get("/orders");

    setOrders(response.data);
  }

  return (
    <div>
      <h1>Painel de Pedidos</h1>

      {orders.map((order) => (
        <div key={order._id}>
          <h3>{order.customerName}</h3>

          <p>Status: {order.status}</p>

          <p>Total: R$ {order.total}</p>
        </div>
      ))}
    </div>
  );
}
    