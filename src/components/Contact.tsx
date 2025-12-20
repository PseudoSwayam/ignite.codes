import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import { ScrollReveal } from './ScrollRevealAnimations';

const Contact: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your Formspree endpoint
      const response = await fetch('https://formspree.io/f/xovljyzb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-transparent to-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Let's Connect
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-beige-300 to-beige-500 rounded-full mb-4" />
              <p className="text-beige-100 text-lg">
                Have a project in mind or just want to chat? I'd love to hear from you!
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-8 mb-12">
              <motion.a
                href="https://github.com/PseudoSwayam"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
                title="GitHub"
              >
                <Github size={32} className="text-beige-400 group-hover:text-beige-200 transition-colors duration-300" strokeWidth={1.5} />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/swayamsahoo11/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
                title="LinkedIn"
              >
                <Linkedin size={32} className="text-beige-400 group-hover:text-beige-200 transition-colors duration-300" strokeWidth={1.5} />
              </motion.a>
              
              <motion.a
                href="mailto:swayampr.sahoo@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
                title="Email"
              >
                <Mail size={32} className="text-beige-400 group-hover:text-beige-200 transition-colors duration-300" strokeWidth={1.5} />
              </motion.a>
            </div>
            
            {/* Contact Form */}
            <ScrollReveal delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/70 backdrop-blur-xl rounded-3xl p-8 border border-beige-400/20 shadow-2xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl border-2 border-beige-600/30 bg-beige-900/20 text-white placeholder-beige-300/50 focus:ring-2 focus:ring-beige-400/50 focus:border-beige-400/50 transition-all duration-300 text-base"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl border-2 border-beige-600/30 bg-beige-900/20 text-white placeholder-beige-300/50 focus:ring-2 focus:ring-beige-400/50 focus:border-beige-400/50 transition-all duration-300 text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="relative group">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl border-2 border-beige-600/30 bg-beige-900/20 text-white placeholder-beige-300/50 focus:ring-2 focus:ring-beige-400/50 focus:border-beige-400/50 transition-all duration-300 resize-none text-base"
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-beige-300 to-beige-500 text-black rounded-2xl font-semibold hover:shadow-xl hover:shadow-beige-400/30 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 text-base group"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    )}
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </motion.button>
                  
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center p-4 bg-beige-100 text-beige-900 rounded-xl font-medium"
                    >
                      🎉 Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-medium"
                    >
                      ⚠️ Something went wrong. Please try again or email me directly.
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </ScrollReveal>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;