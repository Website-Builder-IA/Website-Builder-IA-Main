import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  image?: string;
  onRemove?: () => void;
  uploading?: boolean;
}

export function ImageUpload({ onUpload, image, onRemove, uploading }: ImageUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      await onUpload(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  if (uploading) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (image) {
    return (
      <div className="relative">
        <img
          src={image}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg"
        />
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
      <p className="text-gray-600">
        {isDragActive ? 'Solte a imagem aqui...' : 'Arraste e solte uma imagem aqui, ou clique para selecionar'}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Máximo 5MB. Formatos: JPG, PNG, GIF
      </p>
    </div>
  );
}