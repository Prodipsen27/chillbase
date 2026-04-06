import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`} className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1 block">
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
        <img 
          src={listing.images?.[0]?.url || listing.image?.url || 'https://via.placeholder.com/400'} 
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-10">
          <button 
            type="button"
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#FF385C] transition-colors border-none cursor-pointer"
            onClick={(e) => { e.preventDefault(); /* Like logic later */ }}
          >
            <span className="material-symbols-outlined text-xl">favorite</span>
          </button>
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-3 py-1 bg-surface-container-highest/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white rounded-full">
            {listing.category || 'Trending'}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-headline font-bold text-white text-lg leading-tight truncate max-w-[200px]">
            {listing.title}
          </h3>
          <p className="text-on-surface-variant text-sm flex items-center gap-1 mt-1 truncate max-w-[200px]">
            <span className="material-symbols-outlined text-sm shrink-0">location_on</span>
            {listing.location}, {listing.country}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="material-symbols-outlined text-primary text-sm shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-sm font-bold text-white">4.92</span>
        </div>
      </div>
      <p className="mt-2 text-white font-headline font-extrabold text-lg">
        ₹{listing.price?.toLocaleString()} <span className="font-medium text-on-surface-variant text-sm">/ night</span>
      </p>
    </Link>
  );
};

export default ListingCard;
