"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // สำหรับเปลี่ยนหน้า

export default function DPIMNavbar() {
  const [userSession, setUserSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const sessionData = localStorage.getItem("dpim_session"); //
    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        setUserSession(parsed.user); //
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
  }, []);

  // ฟังก์ชันสำหรับการ Logout
  const handleLogout = () => {
    localStorage.removeItem("dpim_session"); // ลบข้อมูล Session ออกจากเครื่อง
    setUserSession(null);
    router.push("/login"); // ส่งผู้ใช้กลับไปหน้า Login
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b5232] shadow-lg border-b border-white/10 font-sans">
      <div className="w-full px-4 sm:px-8 py-2.5 flex items-center justify-between">
        
        {/* ฝั่งซ้ายสุด: Logo และชื่อระบบ */}
        <div className="flex items-center">
          {userSession ? (
            <i className="fas fa-database text-[#ffc107] me-3 text-xl"></i>
          ) : (
            <i className="fas fa-landmark text-[#ffc107] me-3 text-2xl"></i>
          )}
          
          <div className="flex flex-col text-white">
            <span className="font-bold text-lg sm:text-xl leading-tight tracking-wide">
              {userSession ? "DPIM System Monitor" : "DPIM Portal"}
            </span>
            {!userSession && (
              <span className="text-[10px] sm:text-[13px] font-light opacity-90 leading-tight">
                กรมอุตสาหกรรมพื้นฐานและการเหมืองแร่
              </span>
            )}
          </div>
        </div>

        {/* ฝั่งขวาสุด: แสดงเมื่อ Login แล้ว */}
        {userSession && (
          <div className="flex items-center gap-6 text-white text-sm">
            {/* เลือกภาษา */}
            <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-[#ffc107] transition-colors">
              <i className="fas fa-globe"></i>
              <span>ไทย (TH)</span>
              <i className="fas fa-caret-down text-[10px]"></i>
            </div>

            {/* ข้อมูลผู้ใช้และปุ่ม Logout */}
            <div className="flex items-center gap-4 pl-6 border-l border-white/20">
              <div className="flex items-center gap-3 cursor-default">
                <div className="w-8 h-8 bg-[#ffc107] rounded-full flex items-center justify-center text-[#0b5232] font-bold shadow-md">
                  AU
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-white text-sm">
                    {userSession.name || "ผู้ดูแลระบบ"}
                  </span>
                  <span className="text-[10px] text-[#ffc107] mt-1 uppercase tracking-tighter">
                    {userSession.role || "Administrator"}
                  </span>
                </div>
              </div>

              {/* ปุ่ม Logout */}
              <button 
                onClick={handleLogout}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 border border-white/10 shadow-sm hover:shadow-md active:scale-95 hover:border-red-300"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span className="hidden sm:inline">ออกจากระบบ</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}