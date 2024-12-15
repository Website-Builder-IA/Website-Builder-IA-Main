import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { uploadImage } from '../../utils/imageUpload';

interface GalleryContentProps {
  onSave: (content: any) => void;
  onBack: () => void;
  initialData?: any;
}

export function GalleryContent({ onSave, onBack, initialData }: GalleryContentProps) {
  const [images, setImages] = useState<Array<{ url: string; caption: string }>>(
    initialData?.images || []
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setError(null);
    try {
      const newImages = await Promise.all(
        acceptedFiles.map(async (file) => {
          const url = await uploadImage(file);
          return { url, caption: '' };
        })
      );
      setImages((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
      setError('Erro ao fazer upload das imagens. Por favor, tente novamente.');
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5242880, // 5MB
  });

  const handleCaptionChange = (index: number, caption: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, caption } : img))
    );
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ images });
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
        <h2 className="text-2xl font-bold text-gray-900">Galeria de Fotos</h2>
        <p className="mt-2 text-gray-600">
          Adicione fotos para mostrar seu trabalho
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            {isDragActive
              ? 'Solte as imagens aqui...'
              : 'Arraste e solte imagens aqui, ou clique para selecionar'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Máximo 5MB por arquivo. Formatos: JPG, PNG, GIF
          </p>
        </div>

        {error && (
          <div className="text-center text-red-600 py-2">
            {error}
          </div>
        )}

        {uploading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Fazendo upload das imagens...</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={image.url}
                alt={`Imagem ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <input
                type="text"
                value={image.caption}
                onChange={(e) => handleCaptionChange(index, e.target.value)}
                placeholder="Adicione uma legenda..."
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={images.length === 0}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Salvar Galeria
        </button>
      </form>
    </div>
  );
}