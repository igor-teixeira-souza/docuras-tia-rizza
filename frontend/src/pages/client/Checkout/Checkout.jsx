import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import OrderSummary from "../../../components/features/OrderSummary";
import CheckoutForm from "./CheckoutForm";
import CheckoutSuccessModal from "./CheckoutSuccessModal";
import Loader from "../../../components/ui/Loader";
import Button from "../../../components/ui/Button";
import { ordersAPI } from "../../../api/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";

    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, phone: digits }));
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim())
      newErrors.customerName = "Nome é obrigatório";
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório";
    else if (!/^\d{10,11}$/.test(formData.phone))
      newErrors.phone = "Telefone inválido";
    // Endereço é opcional, não precisa validar
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para finalizar o pedido.");
      navigate("/login");
      return;
    }
    if (!validateForm()) {
      toast.error("Preencha os campos obrigatórios corretamente");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Carrinho vazio");
      navigate("/menu");
      return;
    }

    setLoading(true);
    try {
      // Trata o endereço: se estiver vazio ou apenas espaços, envia undefined
      const addressValue =
        formData.address && formData.address.trim() !== ""
          ? formData.address.trim()
          : undefined;

      console.log("📦 Dados enviados:", {
        customer: formData.customerName,
        phone: formData.phone.replace(/\D/g, ""),
        address: addressValue,
        itemsCount: cartItems.length,
        total: cartTotal,
      });

      const orderData = {
        customer: formData.customerName,
        phone: formData.phone.replace(/\D/g, ""),
        address: addressValue,
        items: cartItems.map((item) => ({
          productId: item.product.id || item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total: cartTotal,
      };

      const response = await ordersAPI.create(orderData);
      setOrderNumber(response.data.id || "N/A");
      setShowSuccessModal(true);
      clearCart();
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data);
      toast.error(
        error.response?.data?.error ||
          "Erro ao processar pedido. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Carrinho vazio</h2>
          <p className="text-gray-600 mb-6">
            Adicione produtos antes de finalizar o pedido.
          </p>
          <Button onClick={() => navigate("/menu")}>Ir para o Menu</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm
              formData={formData}
              phoneValue={formatPhone(formData.phone)}
              errors={errors}
              onChange={handleChange}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
          <div className="lg:col-span-1">
            <OrderSummary items={cartItems} total={cartTotal} />
          </div>
        </div>
      </div>
      <CheckoutSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/");
        }}
        orderNumber={orderNumber}
      />
      {loading && <Loader fullScreen />}
    </div>
  );
};

export default Checkout;
