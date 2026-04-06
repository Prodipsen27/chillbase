import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingService } from '../services/api';
import { motion } from 'framer-motion';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    country: '',
    category: 'Villas'
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ["Villas", "Cabins", "Beachfront", "Modernist", "Treehouses", "Rooms", "Trending", "Mountains", "Amazing Pools", "Farms"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(`listing[${key}]`, formData[key]));
    if (image) data.append('listing[image]', image);

    try {
      await listingService.create(data);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error creating listing. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex justify-center items-center relative overflow-hidden bg-background text-on-surface font-body">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tertiary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl glass-panel rounded-[2rem] p-8 md:p-12 relative z-10 border border-white/10"
        style={{
            background: "rgba(27, 27, 30, 0.6)",
            backdropFilter: "blur(20px)"
        }}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 text-center">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,81,105,0.4)]">
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add_home</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-white tracking-tighter mb-2">Host Your Place</h1>
            <p className="text-on-surface-variant max-w-md">Share your sanctuary with the world. Join our curated collective of exceptional stays.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest font-label font-bold text-on-surface-variant ml-4">Listing Title</label>
              <input 
                className="w-full bg-surface-container-highest border-none rounded-full px-6 py-4 text-on-surface glow-focus outline-none focus:ring-primary focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent transition-all duration-300 placeholder:text-outline-variant font-bold" 
                placeholder="e.g. Minimalist Glass Villa" 
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest font-label font-bold text-on-surface-variant ml-4">Price per night (₹)</label>
              <input 
                className="w-full bg-surface-container-highest border-none rounded-full px-6 py-4 text-on-surface glow-focus outline-none focus:ring-primary focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent transition-all duration-300 placeholder:text-outline-variant font-bold" 
                placeholder="₹ 0.00" 
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
               />
            </div>
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest font-label font-bold text-on-surface-variant ml-4">City / Region</label>
              <input 
                className="w-full bg-surface-container-highest border-none rounded-full px-6 py-4 text-on-surface glow-focus outline-none focus:ring-primary focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent transition-all duration-300 placeholder:text-outline-variant font-bold" 
                placeholder="e.g. Reykjavik" 
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest font-label font-bold text-on-surface-variant ml-4">Country</label>
              <input 
                className="w-full bg-surface-container-highest border-none rounded-full px-6 py-4 text-on-surface glow-focus outline-none focus:ring-primary focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent transition-all duration-300 placeholder:text-outline-variant font-bold" 
                placeholder="e.g. Iceland" 
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-widest font-label font-bold text-on-surface-variant ml-4">Property Category</label>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`px-6 py-2 rounded-full border text-sm font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    formData.category === cat 
                      ? 'border-primary text-primary bg-primary/10' 
                      : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary bg-transparent'
                  }`} 
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest font-label font-bold text-on-surface-variant ml-4">Detailed Description</label>
            <textarea 
              className="w-full bg-surface-container-highest border-none rounded-[2rem] px-6 py-4 text-on-surface glow-focus outline-none focus:ring-primary focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent transition-all duration-300 placeholder:text-outline-variant resize-none font-bold min-h-[150px]" 
              placeholder="Tell travelers what makes your place unique..." 
              required
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-widest font-label font-bold text-on-surface-variant ml-4">Property Gallery</label>
            <div className="relative w-full h-48 flex flex-col items-center justify-center cursor-pointer group hover:bg-primary/5 transition-colors duration-300"
                 style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23FF385C' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
                    borderRadius: "24px"
                 }}
            >
              <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
              />
              <div className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                 <span className="material-symbols-outlined text-primary">cloud_upload</span>
              </div>
              <p className="text-sm font-bold text-on-surface">
                 {image ? <span className="text-primary">{image.name}</span> : 'Drag & drop images here'}
              </p>
              <p className="text-xs font-bold text-on-surface-variant mt-1">or click to browse from device</p>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6">
            <button 
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-5 rounded-full font-headline font-black uppercase text-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_10px_40px_rgba(255,81,105,0.3)] border-none cursor-pointer flex items-center justify-center disabled:opacity-70 gap-2" 
              type="submit"
            >
              {loading ? (
                  <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
              ) : (
                  "List Your Place"
              )}
            </button>
            <p className="text-center text-xs font-bold text-outline-variant mt-6">By clicking, you agree to our <a className="underline hover:text-primary transition-colors cursor-pointer text-white" href="#">Hosting Terms & Conditions</a>.</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateListing;
