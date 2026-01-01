"use client";

import React from 'react';
import { Menubar } from 'primereact/menubar';

export default function DPIMNavbar() {
  const brand = (
    <div className="flex items-center">
      {/* Exact Font Awesome classes as requested */}
      <i className="fas fa-landmark fa-2x mr-3 text-[#ffc107]"></i>
      
      <div className="flex flex-col text-white leading-tight">
        <span className="font-bold text-lg sm:text-xl tracking-wide">
          DPIM Portal
        </span>
        <span className="text-[10px] sm:text-[13px] font-light opacity-90">
          กรมอุตสาหกรรมพื้นฐานและการเหมืองแร่
        </span>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b5232] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <Menubar 
          start={brand} 
          className="bg-transparent border-none rounded-none py-3"
          pt={{
            root: { className: 'bg-transparent border-none' },
            start: { className: 'bg-transparent p-0 m-0 border-none' }
          }}
        />
      </div>
    </header>
  );
}