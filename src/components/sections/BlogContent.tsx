import React, { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogContentProps {
  onSave: (content: any) => void;
  onBack: () => void;
  initialData?: any;
}

export function BlogContent({ onSave, onBack, initialData }: BlogContentProps) {
  const [posts, setPosts] = useState<Array<{
    title: string;
    content: string;
    excerpt: string;
  }>>(initialData?.posts || []);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const handleAddPost = () => {
    setPosts(prev => [...prev, { title: '', content: '', excerpt: '' }]);
  };

  const handleRemovePost = (index: number) => {
    setPosts(prev => prev.filter((_, i) => i !== index));
  };

  const handlePostChange = (index: number, field: string, value: string) => {
    setPosts(prev => prev.map((post, i) => 
      i === index ? { ...post, [field]: value } : post
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ posts });
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
        <h2 className="text-2xl font-bold text-gray-900">Blog</h2>
        <p className="mt-2 text-gray-600">
          Adicione artigos e novidades
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {posts.map((post, index) => (
          <div key={index} className="relative p-4 border rounded-lg">
            <button
              type="button"
              onClick={() => handleRemovePost(index)}
              className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título do Post
                </label>
                <input
                  type="text"
                  required
                  value={post.title}
                  onChange={(e) => handlePostChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resumo
                </label>
                <textarea
                  required
                  rows={2}
                  value={post.excerpt}
                  onChange={(e) => handlePostChange(index, 'excerpt', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Um breve resumo do post..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conteúdo
                </label>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <textarea
                      required
                      rows={8}
                      value={post.content}
                      onChange={(e) => handlePostChange(index, 'content', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Escreva seu post aqui... (suporta Markdown)"
                    />
                  </div>
                  {previewIndex === index && (
                    <div className="flex-1 p-4 border rounded-lg prose prose-sm max-w-none">
                      <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewIndex(previewIndex === index ? null : index)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  {previewIndex === index ? 'Ocultar Preview' : 'Mostrar Preview'}
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddPost}
          className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Post
        </button>

        <button
          type="submit"
          disabled={posts.length === 0}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Salvar Posts
        </button>
      </form>
    </div>
  );
}