import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
=======
import { useParams, Link } from 'react-router-dom';
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/supabase';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

<<<<<<< HEAD
=======
  const handleBookClick = () => {
    // Navigate to home page and scroll to booking section
    window.location.href = '/#booking';
  };

>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
  if (loading) {
    return (
      <div className="min-h-screen bg-space-black pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-300">Loading post...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-space-black pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-300">Post not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-black">
      {/* Featured Image */}
      <div 
        className="h-[60vh] relative bg-cover bg-center"
        style={{ backgroundImage: `url(${post.featured_image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-space-black"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative">
        <article className="max-w-4xl mx-auto bg-steel-gray/20 backdrop-blur-sm rounded-xl p-8">
<<<<<<< HEAD
          <a 
            href="/blog"
=======
          <Link 
            to="/blog"
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
<<<<<<< HEAD
          </a>
=======
          </Link>
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)

          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-400 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.published_at).toLocaleDateString()}
            </div>
            <div>By {post.author}</div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rocket-red/20 text-rocket-red"
              >
                <Tag className="h-4 w-4 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <div 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* CTA Banner */}
        <div className="max-w-4xl mx-auto mt-16 mb-8">
          <div className="bg-rocket-red/10 border border-rocket-red/30 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-orbitron font-bold text-white mb-4">
              Ready for Your Space Coast Adventure?
            </h2>
            <p className="text-gray-300 mb-6">
              Experience the thrill of rocket launches and bioluminescent waters firsthand.
            </p>
<<<<<<< HEAD
            <a 
              href="/#booking"
              className="inline-block px-8 py-3 bg-rocket-red hover:bg-red-700 text-white font-orbitron font-semibold rounded-md transition duration-300"
            >
              Book Your Tour Now
            </a>
=======
            <button 
              onClick={handleBookClick}
              className="inline-block px-8 py-3 bg-rocket-red hover:bg-red-700 text-white font-orbitron font-semibold rounded-md transition duration-300"
            >
              Book Your Tour Now
            </button>
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;