import React, { useState, useEffect, useRef } from "react";
import { settingsAPI, api } from "../../../api/api";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";
import { toast } from "react-hot-toast";
import { Upload, X } from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      setSettings(response.data);
    } catch (error) {
      toast.error("Erro ao carregar configurações");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione uma imagem válida.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB.");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSettings((prev) => ({ ...prev, heroImage: response.data.url }));
      toast.success("Imagem enviada com sucesso!");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error || "Erro ao fazer upload da imagem.";
      toast.error(errorMessage);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveHeroImage = () => {
    setSettings((prev) => ({ ...prev, heroImage: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsAPI.update(settings);
      toast.success("Configurações salvas!");
    } catch (error) {
      toast.error("Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configurações do Site</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 max-w-2xl"
      >
        <div className="space-y-4">
          {/* Nome da loja */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nome da loja
            </label>
            <input
              type="text"
              name="storeName"
              value={settings?.storeName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-medium mb-1">Telefone</label>
            <input
              type="text"
              name="phone"
              value={settings?.phone || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={settings?.email || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-medium mb-1">Endereço</label>
            <input
              type="text"
              name="address"
              value={settings?.address || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Horários */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Horário (seg-sex)
              </label>
              <input
                type="text"
                name="hoursWeek"
                value={settings?.hoursWeek || ""}
                onChange={handleChange}
                placeholder="8h às 19h"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Horário (sábado)
              </label>
              <input
                type="text"
                name="hoursSat"
                value={settings?.hoursSat || ""}
                onChange={handleChange}
                placeholder="9h às 17h"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Redes sociais */}
          <div>
            <label className="block text-sm font-medium mb-1">Instagram</label>
            <input
              type="url"
              name="instagram"
              value={settings?.instagram || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Facebook</label>
            <input
              type="url"
              name="facebook"
              value={settings?.facebook || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp</label>
            <input
              type="text"
              name="whatsapp"
              value={settings?.whatsapp || ""}
              onChange={handleChange}
              placeholder="5511999999999"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Upload de imagem da Hero Section */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Imagem da Hero Section
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-pink-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="hero-image"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500"
                  >
                    <span>Selecionar arquivo</span>
                    <input
                      id="hero-image"
                      name="heroImage"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF até 5MB</p>
              </div>
            </div>

            {uploadingImage && (
              <div className="mt-2 flex items-center justify-center">
                <Loader size="sm" />
                <span className="ml-2 text-sm text-gray-500">
                  Enviando imagem...
                </span>
              </div>
            )}

            {settings?.heroImage && (
              <div className="mt-2 relative group">
                <img
                  src={settings.heroImage}
                  alt="Preview Hero"
                  className="w-full h-40 object-cover rounded-lg border"
                  onError={(e) => {
                    e.target.src = "";
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemoveHeroImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition"
                  title="Remover imagem"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Esta imagem aparecerá como fundo da seção principal do site
              (opcional).
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
