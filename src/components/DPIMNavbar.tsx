"use client";

export default function DPIMNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b5232] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center">
          {/* Exact Font Awesome classes and color */}
          <i className="fas fa-landmark fa-2x me-3 text-warning"></i>
          
          <div className="flex flex-col text-white leading-tight">
            <span className="font-bold text-lg sm:text-xl tracking-wide">
              DPIM Portal
            </span>
            <span className="text-[10px] sm:text-[13px] font-light opacity-90">
              กรมอุตสาหกรรมพื้นฐานและการเหมืองแร่
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}