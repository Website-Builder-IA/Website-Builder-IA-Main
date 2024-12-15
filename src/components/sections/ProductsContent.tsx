import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';
import { uploadImage } from '../../services/imageUpload';
import { MoneyInput } from '../ui/MoneyInput';

interface ProductsContentProps {
  onSave: (content: any) => void;
  onBack: () => void;
  initialData?: any;
}

export function ProductsContent({ onSave, onBack, initialData }: ProductsContentProps) {
  const [products, setProducts] = useState<Array<{
    name: string;
    description: string;
    price: string;
    image?: string;
  }>>(initialData?.products || []);
  const [uploading, setUploading] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState<number | null>(null);

  const handleAddProduct = () => {
    setProducts(prev => [...prev, { name: '', description: '', price: '' }]);
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(prev => prev.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, field: string, value: string) => {
    setProducts(prev => prev.map((product, i) => 
      i === index ? { ...product, [field]: value } : product
    ));
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (currentProductIndex === null) return;
    
    setUploading(true);
    try {
      const file = acceptedFiles[0];
      const imageUrl = await uploadImage(file);
      
      setProducts(prev => prev.map((product, index) => 
        index === currentProductIndex
          ? { ...product, image: imageUrl }
          : product
      ));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao fazer upload da imagem. Por favor, tente novamente.');
    } finally {
      setUploading(false);
      setCurrentProductIndex(null);
    }
  }, [currentProductIndex]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5242880, // 5MB
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ products });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para seleção de páginas
      </button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Seus Produtos</h2>
        <p className="mt-2 text-gray-600">
          Adicione os produtos que você oferece
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {products.map((product, index) => (
          <div key={index} className="relative p-4 border rounded-lg">
            <button
              type="button"
              onClick={() => handleRemoveProduct(index)}
              className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  required
                  value={product.name}
                  onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  required
                  rows={3}
                  value={product.description}
                  onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço
                </label>
                <MoneyInput
                  value={product.price}
                  onChange={(value) => handleProductChange(index, 'price', value)}
                  required
                  placeholder="R$ 0,00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagem do Produto
                </label>
                {product.image ? (
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleProductChange(index, 'image', '')}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    onClick={() => setCurrentProductIndex(index)}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive && currentProductIndex === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">
                      {isDragActive && currentProductIndex === index
                        ? 'Solte a imagem aqui...'
                        : 'Arraste e solte uma imagem aqui, ou clique para selecionar'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Máximo 5MB. Formatos: JPG, PNG, GIF
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddProduct}
          className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Produto
        </button>

        <button
          type="submit"
          disabled={products.length === 0}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Salvar Produtos
        </button>
      </form>
    </div>
  );
}