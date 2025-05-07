import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/supabase';
import { Calendar, Tag, ChevronRight } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-space-black">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 bg-steel-gray/10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white text-center mb-4">
            Space Coast Adventures Blog
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Discover insider tips, launch schedules, and local insights for the best rocket viewing and bioluminescent kayaking experiences.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center text-gray-300">Loading posts...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="bg-steel-gray/20 backdrop-blur-sm rounded-xl overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(post.published_at).toLocaleDateString()}
                  </div>
                  
                  <h2 className="text-xl font-orbitron font-semibold text-white mb-3">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {post.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rocket-red/20 text-rocket-red"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-rocket-red hover:text-red-400 font-medium transition-colors"
                  >
                    Read More
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;