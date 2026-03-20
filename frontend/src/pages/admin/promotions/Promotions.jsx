import React, { useState, useEffect } from "react";
import { promotionsAPI } from "../../../api/api";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";
import PromotionForm from "./PromotionForm";
import { toast } from "react-hot-toast";
import { Edit, Trash2, Eye } from "lucide-react";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);

  const fetchPromotions = async () => {
    try {
      const response = await promotionsAPI.getAll();
      setPromotions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error("Erro ao carregar promoções");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleSave = async (promoData) => {
    try {
      if (editingPromo) {
        await promotionsAPI.update(editingPromo.id, promoData);
        toast.success("Promoção atualizada!");
      } else {
        await promotionsAPI.create(promoData);
        toast.success("Promoção criada!");
      }
      fetchPromotions();
      setShowForm(false);
      setEditingPromo(null);
    } catch (error) {
      toast.error("Erro ao salvar promoção");
    }
  };

  const handleEdit = (promo) => {
    setEditingPromo(promo);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta promoção?")) {
      try {
        await promotionsAPI.delete(id);
        toast.success("Promoção excluída");
        fetchPromotions();
      } catch (error) {
        toast.error("Erro ao excluir");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Promoções</h1>
        <Button onClick={() => setShowForm(true)}>Nova Promoção</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div
            key={promo._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={promo.image || "/api/placeholder/400/200"}
              alt={promo.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{promo.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{promo.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {promo.active ? (
                    <span className="text-green-600">Ativa</span>
                  ) : (
                    <span className="text-red-600">Inativa</span>
                  )}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEdit(promo)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(promo._id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal – exibido apenas quando showForm for true */}
      {showForm && (
        <PromotionForm
          promotion={editingPromo}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingPromo(null);
          }}
        />
      )}
    </div>
  );
};

export default Promotions;
