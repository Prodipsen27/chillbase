import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingService } from '../services/api';
import { motion } from 'framer-motion';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await listingService.getOne(id);
        setListing(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return <div className="pt-32 flex flex-col gap-4 justify-center items-center h-screen"><span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span><span className="font-bold tracking-widest uppercase text-xs">Loading Stay</span></div>;
  if (!listing) return <div className="pt-32 text-center h-screen flex flex-col items-center justify-center"><span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span><p className="text-2xl font-bold">Listing not found</p></div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <section className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-white mb-6 transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
          <span>Back</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-white mb-2">{listing.title}</h1>
            <div className="flex items-center gap-4 text-on-surface-variant">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-bold text-on-surface">4.98</span>
                <span className="underline cursor-pointer">128 reviews</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span className="underline cursor-pointer">{listing.location}, {listing.country}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 hover:bg-surface-container-high px-4 py-2 rounded-full transition-all cursor-pointer border-none text-white font-body bg-transparent">
              <span className="material-symbols-outlined text-sm">ios_share</span>
              <span className="text-sm font-semibold uppercase tracking-wider">Share</span>
            </button>
            <button className="flex items-center gap-2 hover:bg-surface-container-high px-4 py-2 rounded-full transition-all cursor-pointer border-none text-white font-body bg-transparent">
              <span className="material-symbols-outlined text-sm">favorite</span>
              <span className="text-sm font-semibold uppercase tracking-wider">Save</span>
            </button>
          </div>
        </div>
      </section>

      {/* Image Gallery (Bento-style Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[600px] mb-12 rounded-xl overflow-hidden">
        <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden">
          <img 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt={listing.title} 
            src={listing.images?.[0]?.url || listing.image?.url || 'https://via.placeholder.com/800'}
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
        </div>

        {/* Dynamic Secondary Images */}
        {[1, 2, 3].map((index) => (
          <div key={index} className="hidden md:block relative group cursor-pointer overflow-hidden bg-surface-container-high">
            {listing.images?.[index]?.url ? (
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={`${listing.title} photo ${index + 1}`} 
                src={listing.images[index].url}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center opacity-50"><span className="material-symbols-outlined text-4xl">image</span></div>
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
          </div>
        ))}

        {/* 5th Image with 'Show all photos' overlay */}
        <div className="hidden md:block relative group cursor-pointer overflow-hidden bg-surface-container-high">
          {listing.images?.[4]?.url ? (
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt={`${listing.title} photo 5`} 
              src={listing.images[4].url}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-50"><span className="material-symbols-outlined text-4xl">image</span></div>
          )}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
          <div className="absolute bottom-4 right-4 bg-surface-container-lowest/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 hover:bg-surface-container-lowest transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">grid_view</span>
            <span className="text-xs font-bold tracking-widest uppercase text-white">Show all photos</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Host Info */}
          <div className="flex items-center justify-between pb-8 border-b border-outline-variant/20">
            <div>
              <h2 className="text-2xl font-black font-headline tracking-tight text-white mb-1">Architectural Sanctuary hosted by {listing.owner?.username || 'Erik'}</h2>
              <p className="text-on-surface-variant font-medium">8 guests · 4 bedrooms · 5 beds · 3.5 baths</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-primary shadow-lg shadow-primary/20 bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">account_circle</span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary p-1 rounded-full text-on-primary flex items-center justify-center w-6 h-6">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <span className="material-symbols-outlined text-3xl text-primary">task_alt</span>
              <div>
                <h3 className="font-bold text-white uppercase tracking-wider text-sm">Risk-Free Cancellation</h3>
                <p className="text-on-surface-variant">Cancel before Sep 24 for a full refund. Flexibility for the modern nomad.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <span className="material-symbols-outlined text-3xl text-primary">security</span>
              <div>
                <h3 className="font-bold text-white uppercase tracking-wider text-sm">ChillPad Protection</h3>
                <p className="text-on-surface-variant">Every booking includes free protection from Host cancellations and listing inaccuracies.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <span className="material-symbols-outlined text-3xl text-primary">workspace_premium</span>
              <div>
                <h3 className="font-bold text-white uppercase tracking-wider text-sm">Design Award Winner</h3>
                <p className="text-on-surface-variant">This property was featured in Architectural Digest's 2023 "The Future of Living" series.</p>
              </div>
            </div>
          </div>

          {/* Long Description */}
          <div className="space-y-6">
            <div className="bg-surface-container-low p-8 rounded-2xl border-l-4 border-primary">
              <p className="text-lg leading-relaxed text-on-surface font-medium italic">
                 "A literal masterpiece of basalt and light. The perfect sanctuary, it's not just a stay; it's a sensory realignment."
              </p>
            </div>
            <p className="text-on-surface-variant leading-relaxed whitespace-pre-line">
               {listing.description}
            </p>
            <button className="flex items-center gap-2 text-white font-bold underline underline-offset-8 decoration-primary decoration-2 hover:text-primary transition-colors uppercase tracking-widest text-xs border-none bg-transparent cursor-pointer">
                Read more about the experience
                <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>

          {/* Amenities Preview */}
          <div className="pt-8 border-t border-outline-variant/20">
            <h3 className="text-xl font-bold font-headline text-white mb-6">What this place offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              <div className="flex items-center gap-4 text-on-surface-variant">
                <span className="material-symbols-outlined">mountain_flag</span>
                <span>Mountain & Ocean view</span>
              </div>
              <div className="flex items-center gap-4 text-on-surface-variant">
                <span className="material-symbols-outlined">wifi</span>
                <span>High-speed Starlink WiFi</span>
              </div>
              <div className="flex items-center gap-4 text-on-surface-variant">
                <span className="material-symbols-outlined">hot_tub</span>
                <span>Private Geothermal Spa</span>
              </div>
              <div className="flex items-center gap-4 text-on-surface-variant">
                <span className="material-symbols-outlined">fireplace</span>
                <span>Architectural Fireplace</span>
              </div>
            </div>
            <button className="mt-8 px-8 py-3 rounded-full border border-outline text-white font-bold hover:bg-surface-container-high transition-all uppercase tracking-widest text-xs bg-transparent cursor-pointer">
                Show all 45 amenities
            </button>
          </div>
        </div>

        {/* Right Column: Sticky Booking Card */}
        <div className="relative">
          <div className="sticky top-28 glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/60 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-3xl font-black text-white font-headline">₹{listing.price?.toLocaleString() || 0}</span>
                <span className="text-on-surface-variant font-medium"> / night</span>
              </div>
              <div className="flex items-center gap-1 text-sm mb-1">
                <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-bold text-white">4.98</span>
                <span className="text-on-surface-variant">· 128 reviews</span>
              </div>
            </div>

            {/* Date & Guest Picker */}
            <div className="rounded-2xl border border-outline-variant/30 overflow-hidden">
              <div className="grid grid-cols-2 border-b border-outline-variant/30">
                <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer border-r border-outline-variant/30">
                  <label className="block text-[10px] font-black text-white uppercase tracking-widest mb-1">Check-in</label>
                  <span className="text-on-surface-variant text-sm">Add dates</span>
                </div>
                <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                  <label className="block text-[10px] font-black text-white uppercase tracking-widest mb-1">Check-out</label>
                  <span className="text-on-surface-variant text-sm">Add dates</span>
                </div>
              </div>
              <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                <label className="block text-[10px] font-black text-white uppercase tracking-widest mb-1">Guests</label>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant text-sm">2 guests</span>
                  <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full border-none cursor-pointer py-5 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-black uppercase tracking-tighter text-lg shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                Reserve Stay
            </button>
            <p className="text-center text-on-surface-variant text-xs m-0">You won't be charged yet</p>

            {/* Price Breakdown */}
            <div className="space-y-4 pt-4">
              <div className="flex justify-between text-on-surface-variant">
                <span className="underline decoration-dotted cursor-pointer hover:text-white">₹{listing.price?.toLocaleString()} x 5 nights</span>
                <span>₹{(listing.price * 5 || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span className="underline decoration-dotted cursor-pointer hover:text-white">Cleaning fee</span>
                <span>₹1,500</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span className="underline decoration-dotted cursor-pointer hover:text-white">Service fee</span>
                <span>₹3,500</span>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 flex justify-between">
                <span className="text-lg font-bold text-white">Total before taxes</span>
                <span className="text-lg font-bold text-white">₹{((listing.price * 5) + 5000 || 0).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <span className="material-symbols-outlined text-primary">diamond</span>
              <p className="text-xs text-primary font-bold uppercase tracking-tight m-0">Rare find: This place is highly rated.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingDetail;
