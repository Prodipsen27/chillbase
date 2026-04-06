import React, { useState, useEffect } from 'react';
import { listingService } from '../services/api';
import ListingCard from '../components/ListingCard';
import { motion, AnimatePresence } from 'framer-motion';

const heroImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
];

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "Trending", icon: "local_fire_department" },
    { name: "Mountains", icon: "terrain" },
    { name: "Castles", icon: "fort" },
    { name: "Farms", icon: "agriculture" },
    { name: "Beach", icon: "beach_access" },
    { name: "Amazing Pools", icon: "pool" },
    { name: "Cabins", icon: "cabin" },
    { name: "Arctic", icon: "ac_unit" },
    { name: "National Parks", icon: "park" }
  ];

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await listingService.getAll({ search, category });
      setListings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchListings();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, category]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[100vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={currentImageIndex}
              alt="Hero Background" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-125" 
              src={heroImages[currentImageIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background/90 z-10 leading-none"></div>
        </div>
        <div className="relative z-20 text-center max-w-4xl w-full px-4">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold text-white tracking-tighter mb-8 leading-[0.9]"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find your <span className="text-primary italic font-light drop-shadow-2xl">Chill</span> stay.
          </motion.h1>
          {/* Search Bar */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-surface-container-highest/80 backdrop-blur-2xl rounded-full p-2 flex items-center shadow-2xl border border-white/10 group focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <div className="flex-1 flex items-center px-4 md:px-6 border-r border-white/10">
                <div className="flex flex-col items-start w-full">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Where</span>
                  <input 
                    className="bg-transparent border-none p-0 text-white placeholder:text-on-surface-variant/50 focus:ring-0 text-sm font-semibold w-full outline-none" 
                    placeholder="Search destinations" 
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="hidden md:flex flex-1 items-center px-6 border-r border-white/10 cursor-pointer hover:bg-white/5 transition-colors rounded-3xl h-full py-2">
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Check in</span>
                  <span className="text-sm font-semibold text-white/50">Add dates</span>
                </div>
              </div>
              <div className="p-1 pl-2">
                <button className="bg-[#FF385C] coral-glow text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-none cursor-pointer">
                  <span className="material-symbols-outlined">search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Category Filters */}
      <section className="sticky top-[72px] z-40 bg-background/80 backdrop-blur-md py-6 px-8 border-y border-white/5">
        <div className="flex items-center gap-10 overflow-x-auto hide-scrollbar max-w-[1600px] mx-auto w-full">
          <div 
            onClick={() => setCategory('')}
            className={`flex flex-col items-center gap-2 group cursor-pointer transition-all hover:scale-110 pb-2 ${category === '' ? 'border-b-2 border-white' : ''}`}
          >
            <span className={`material-symbols-outlined transition-colors ${category === '' ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`} style={{ fontVariationSettings: category === '' ? "'FILL' 1" : "'FILL' 0" }}>explore</span>
            <span className={`text-xs font-bold font-headline uppercase tracking-tighter ${category === '' ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`}>All</span>
          </div>

          {categories.map((cat) => (
            <div 
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`flex flex-col items-center gap-2 group cursor-pointer transition-all hover:scale-110 pb-2 ${category === cat.name ? 'border-b-2 border-white' : ''}`}
            >
              <span className={`material-symbols-outlined transition-colors ${category === cat.name ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`} style={{ fontVariationSettings: category === cat.name ? "'FILL' 1" : "'FILL' 0" }}>{cat.icon}</span>
              <span className={`text-xs font-bold font-headline uppercase tracking-tighter ${category === cat.name ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`}>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Listings Grid */}
      <section className="px-8 py-12 max-w-[1600px] mx-auto min-h-[50vh]">
        {loading ? (
          <div className="flex justify-center flex-col gap-4 items-center h-64 text-on-surface-variant">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            <span className="font-bold tracking-widest uppercase text-xs">Loading Stays</span>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-headline font-bold text-white">{listings.length} amazing places</h2>
                <button className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-bright px-5 py-2.5 rounded-full text-sm font-bold border border-white/5 transition-all text-white">
                    <span className="material-symbols-outlined text-sm">tune</span>
                    <span className="uppercase tracking-widest text-xs">Filters</span>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {listings.map((listing, index) => (
                <motion.div
                  key={listing._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <ListingCard listing={listing} />
                </motion.div>
              ))}
            </div>

            {listings.length === 0 && (
              <div className="text-center py-20 bg-surface-container-low border border-white/5 rounded-[3rem] mt-10">
                <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
                <p className="text-xl font-bold font-headline text-on-surface-variant mb-2">No sanctuaries found</p>
                <p className="text-sm font-medium text-outline-variant mb-6">Try adjusting your filters or search terms.</p>
                <button onClick={() => {setSearch(''); setCategory('');}} className="px-8 py-3 rounded-full border border-primary text-primary font-bold hover:bg-primary/10 transition-all uppercase tracking-widest text-xs">
                    Clear all filters
                </button>
              </div>
            )}
            
            {listings.length > 0 && (
                <div className="mt-20 flex justify-center">
                    <button className="bg-surface-container-high hover:bg-surface-bright text-white font-headline font-bold px-12 py-4 rounded-full border border-white/5 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-xs">
                        Show more destinations
                    </button>
                </div>
            )}
          </>
        )}
      </section>
      
      {/* Mobile Floating Navigation Shell (Bottom) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50 glass-card rounded-full px-6 py-3 flex justify-between items-center shadow-2xl border border-white/10">
          <div className="flex flex-col items-center gap-1 text-primary cursor-pointer">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Explore</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-on-surface-variant cursor-pointer hover:text-white transition-colors">
              <span className="material-symbols-outlined">favorite</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Wishlist</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-on-surface-variant cursor-pointer hover:text-white transition-colors">
              <span className="material-symbols-outlined">luggage</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Trips</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-on-surface-variant cursor-pointer hover:text-white transition-colors">
              <span className="material-symbols-outlined">account_circle</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
          </div>
      </div>
    </>
  );
};

export default Home;

