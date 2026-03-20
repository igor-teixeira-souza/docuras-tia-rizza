import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import { Upload, X } from "lucide-react";

const PromotionForm = ({ promotion, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: promotion?.title || "",
    description: promotion?.description || "",
    image: promotion?.image || "",
    link: promotion?.link || "",
    active: promotion?.active ?? true,
    validUntil: promotion?.validUntil ? promotion.validUntil.split("T")[0] : "",
  });

  const [imagePreview, setImagePreview] = useState(promotion?.image || "");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (promotion?.image) {
      setImagePreview(promotion.image);
    }
  }, [promotion]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setFormData((prev) => ({ ...prev, image: base64String }));
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: "" }));
    setImageFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Pré-visualização da promoção como aparecerá na hero section
  const renderPreview = () => (
    <div className="relative overflow-hidden rounded-xl shadow-md bg-gradient-to-r from-pink-200 to-pink-300">
      <div className="flex flex-col md:flex-row items-center justify-between p-4">
        <div className="text-center md:text-left mb-4 md:mb-0 flex-1">
          <h3 className="text-lg md:text-xl font-bold text-black mb-1">
            {formData.title || "Título da promoção"}
          </h3>
          <p className="text-sm text-gray-800">
            {formData.description || "Descrição da oferta aparecerá aqui."}
          </p>
          <div className="mt-2">
            <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full">
              Aproveitar
            </span>
          </div>
        </div>
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-md"
          />
        ) : (
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
            Sem imagem
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in">
      {/* Overlay com fundo mais claro e transição */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={onCancel}
      />

      {/* Modal principal com transição de escala */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 animate-scale-up">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {promotion ? "Editar Promoção" : "Nova Promoção"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coluna esquerda - campos do formulário */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link (opcional)
                  </label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="https://exemplo.com/promocao"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Válido até
                    </label>
                    <input
                      type="date"
                      name="validUntil"
                      value={formData.validUntil}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Promoção ativa
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Coluna direita - imagem e preview */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imagem da promoção
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-pink-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                        >
                          <span>Selecionar imagem</span>
                          <input
                            id="image-upload"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">ou arraste e solte</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF até 10MB
                      </p>
                    </div>
                  </div>
                  {imagePreview && (
                    <div className="mt-2 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pré-visualização (hero section)
                  </label>
                  {renderPreview()}
                  <p className="text-xs text-gray-500 mt-2">
                    Esta é uma prévia de como a promoção aparecerá no banner da
                    página inicial.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit">
                {promotion ? "Atualizar" : "Salvar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromotionForm;
