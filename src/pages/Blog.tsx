import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/supabase';
<<<<<<< HEAD
import { Calendar, Tag, ChevronRight } from 'lucide-react';
=======
import { Calendar, Tag, ChevronRight, AlertCircle } from 'lucide-react';
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
=======
  const [error, setError] = useState<string | null>(null);
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
<<<<<<< HEAD
        const { data, error } = await supabase
=======
        setError(null);
        const { data, error: supabaseError } = await supabase
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false });

<<<<<<< HEAD
        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
=======
        if (supabaseError) {
          throw supabaseError;
        }

        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Unable to load blog posts. Please try again later.');
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
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
<<<<<<< HEAD
          <div className="text-center text-gray-300">Loading posts...</div>
=======
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-rocket-red border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-300">Loading posts...</p>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-error/10 border border-error/30 rounded-lg p-6 text-center">
              <AlertCircle className="h-12 w-12 text-error mx-auto mb-4" />
              <p className="text-error">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-error/20 hover:bg-error/30 text-error rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-300">
            <p>No blog posts available yet.</p>
          </div>
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
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