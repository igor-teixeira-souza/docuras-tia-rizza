import React, { useState, useEffect } from "react";
import { promotionsAPI } from "../../../api/api";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";
import PromotionForm from "./PromotionForm";
import { toast } from "react-hot-toast";
import { Edit, Trash2, Plus, Eye } from "lucide-react";

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
    if (!id) {
      toast.error("ID inválido");
      return;
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Gerenciar Promoções
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Total de {promotions.length} promoção(ões)
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-2" />
          Nova Promoção
        </Button>
      </div>

      {/* Grid de promoções responsivo */}
      {promotions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <p className="text-gray-500 mb-4">
            Nenhuma promoção cadastrada ainda.
          </p>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Criar primeira promoção
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {promotions.map((promo) => (
            <div
              key={promo._id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Imagem com overlay no hover */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={promo.image || "/api/placeholder/400/200"}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Badge de status */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      promo.active
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {promo.active ? "Ativa" : "Inativa"}
                  </span>
                </div>
                {/* Overlay de ações no hover (mobile) */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(promo)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    title="Editar"
                  >
                    <Edit size={18} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(promo._id)}
                    className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-4">
                <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-1">
                  {promo.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                  {promo.description || "Sem descrição"}
                </p>

                {/* Validade (se houver) */}
                {promo.validUntil && (
                  <p className="text-xs text-gray-400 mt-2">
                    Válido até:{" "}
                    {new Date(promo.validUntil).toLocaleDateString("pt-BR")}
                  </p>
                )}

                {/* Link (se houver) */}
                {promo.link && (
                  <a
                    href={promo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-pink-600 hover:text-pink-700 mt-2"
                  >
                    <Eye size={12} className="mr-1" />
                    Ver promoção
                  </a>
                )}

                {/* Ações em telas menores (visível apenas no mobile) */}
                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 sm:hidden">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEdit(promo)}
                    className="flex-1"
                  >
                    <Edit size={14} className="mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(promo._id)}
                    className="flex-1"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de formulário */}
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
