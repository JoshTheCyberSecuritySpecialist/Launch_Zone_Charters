import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import ImageUpload from '../components/ui/ImageUpload';
import { Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    author: '',
    featured_image: '',
    tags: [] as string[],
  });

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, featured_image: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          ...formData,
          published_at: new Date().toISOString(),
        }]);

      if (error) throw error;

      toast.success('Blog post created successfully!');
      setFormData({
        title: '',
        slug: '',
        summary: '',
        content: '',
        author: '',
        featured_image: '',
        tags: [],
      });
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error('Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-black pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-orbitron font-bold text-white mb-8">
            Create New Blog Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Featured Image
              </label>
              <ImageUpload onUploadComplete={handleImageUpload} />
              {formData.featured_image && (
                <p className="mt-2 text-sm text-gray-400">
                  Image uploaded successfully
                </p>
              )}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-steel-gray/20 border border-steel-gray/40 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-rocket-red focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full bg-steel-gray/20 border border-steel-gray/40 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-rocket-red focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-300 mb-2">
                Summary
              </label>
              <textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                className="w-full bg-steel-gray/20 border border-steel-gray/40 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-rocket-red focus:border-transparent"
                rows={3}
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full bg-steel-gray/20 border border-steel-gray/40 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-rocket-red focus:border-transparent"
                rows={10}
                required
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="w-full bg-steel-gray/20 border border-steel-gray/40 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-rocket-red focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                }))}
                className="w-full bg-steel-gray/20 border border-steel-gray/40 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-rocket-red focus:border-transparent"
                placeholder="space, rockets, bioluminescence"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full flex items-center justify-center px-6 py-3 rounded-lg font-orbitron font-medium
                ${loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-rocket-red hover:bg-red-700'}
                text-white transition-colors
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Creating Post...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Create Post
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;