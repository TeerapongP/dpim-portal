'use client';

import { useState } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    // ปรับเป็น min-h-screen เพื่อให้รองรับการ scroll บนมือถือถ้าเนื้อหายาวเกินจอ
    <div className="relative min-h-screen flex flex-col font-sans">
      
      {/* Background Layer - ใช้ fixed เพื่อให้รูปนิ่งแม้จะ scroll เนื้อหา */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=2070&auto=format&fit=crop')" }}
      />

      {/* Green Overlay - fixed เช่นกัน */}
      <div className="fixed inset-0 w-full h-full bg-[#0b5232]/85 backdrop-blur-[2px] z-10"></div>

      {/* Main Content Area - ใช้ flex-1 เพื่อดัน footer ลงล่างสุด */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 relative z-20">
        
        {/* Main Login Card - ปรับ flex-col บนมือถือ และ md:flex-row บนจอใหญ่ */}
        <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-black/20">

          {/* Left Side: Form Section */}
          <div className="flex-[1.2] p-6 sm:p-10 lg:p-14 flex flex-col justify-center bg-white">
            <div className="mb-6 lg:mb-8 text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0b5232]">เข้าสู่ระบบ</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 uppercase tracking-tight">DPIM Information System</p>
            </div>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <span className="p-input-icon-left w-full">
                  <i className="fas fa-user text-gray-400 ml-3" />
                  <InputText 
                    placeholder="ชื่อผู้ใช้ / Username" 
                    className="w-full p-3 sm:p-3.5 pl-11 bg-gray-50 border-gray-200 focus:border-[#0b5232] rounded-lg text-sm"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                  />
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="p-input-icon-left w-full">
                  <i className="fas fa-lock text-gray-400 ml-3" />
                  <Password 
                    placeholder="รหัสผ่าน / Password" 
                    toggleMask 
                    feedback={false}
                    className="w-full"
                    inputClassName="w-full p-3 sm:p-3.5 pl-11 bg-gray-50 border-gray-200 focus:border-[#0b5232] rounded-lg text-sm"
                    style={{ width: '100%' }}
                    value={formData.password}
                    onChange={(e: any) => handleInputChange('password', e.target.value)}
                  />
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs font-medium">
                <div className="flex items-center gap-2 text-gray-500">
                  <Checkbox
                    inputId="remember"
                    checked={formData.remember}
                    onChange={(e) => handleInputChange('remember', e.checked || false)}
                  />
                  <label htmlFor="remember" className="cursor-pointer">จดจำฉัน</label>
                </div>
                <a href="#" className="text-gray-400 hover:text-[#0b5232] transition-colors">ลืมรหัสผ่าน?</a>
              </div>

              <Button
                type="submit"
                label="เข้าสู่ระบบ (Login)"
                className="w-full border-none p-3 sm:p-3.5 font-bold text-white rounded-lg transition-all duration-300 hover:brightness-110 hover:shadow-lg active:scale-[0.98]"
                style={{ backgroundColor: '#0b5232' }}
              />
            </form>

            {/* Social Separator */}
            <div className="relative my-8 sm:my-10 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <span className="relative bg-white px-4 text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-widest font-semibold">หรือเข้าใช้งานด้วยบัญชีอื่น</span>
            </div>

            {/* External Providers - ปรับเป็น grid 2 คอลัมน์ และเว้นช่องว่างให้ดีบนมือถือ */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
              <button type="button" className="flex items-center justify-center gap-2 p-2.5 rounded-lg text-white text-[11px] font-bold hover:brightness-110 shadow-sm transition-all"
                      style={{ backgroundColor: '#1a429b' }}>
                <i className="fas fa-fingerprint text-lg" /> ThaiID
              </button>
              <button type="button" className="flex items-center justify-center gap-2 p-2.5 rounded-lg text-white text-[11px] font-bold hover:brightness-110 shadow-sm transition-all"
                      style={{ backgroundColor: '#0d2551' }}>
                <i className="fas fa-mobile-screen text-lg" /> ทางรัฐ
              </button>
              <button type="button" className="flex items-center justify-center gap-2 p-2.5 rounded-lg text-white text-[11px] font-bold hover:brightness-110 shadow-sm transition-all"
                      style={{ backgroundColor: '#6f42c1' }}>
                <i className="fas fa-industry text-lg" /> i-Industry
              </button>
              <button type="button" className="flex items-center justify-center gap-2 p-2.5 rounded-lg text-white text-[11px] font-bold hover:brightness-110 shadow-sm transition-all"
                      style={{ backgroundColor: '#00b0e1' }}>
                <i className="fas fa-briefcase text-lg" /> Biz Portal
              </button>
            </div>
          </div>

          {/* Right Side: PDPA Information - แสดงใต้ฟอร์มบนมือถือ */}
          <div className="flex-1 bg-gray-50/80 p-6 sm:p-10 lg:p-14 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-start">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 border-l-4 border-[#ffc107] pl-4 mb-6 sm:mb-8 uppercase tracking-wide">
              ข้อตกลงและเงื่อนไข (PDPA)
            </h3>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-shield-alt text-green-600 text-lg" />
                </div>
                <div className="flex flex-col">
                  <h6 className="font-bold text-sm sm:text-base text-gray-700 leading-tight">ความปลอดภัยข้อมูล</h6>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">
                    ระบบมีการเก็บ Log การใช้งานตาม พ.ร.บ. คอมพิวเตอร์ฯ เพื่อตรวจสอบและรักษาความปลอดภัย
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-check text-yellow-600 text-lg" />
                </div>
                <div className="flex flex-col">
                  <h6 className="font-bold text-sm sm:text-base text-gray-700 leading-tight">การยืนยันตัวตน</h6>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">
                    รองรับการเข้าใช้งานผ่าน ThaiID, ทางรัฐ และ i-Industry เพื่อความสะดวกและถูกต้องของข้อมูล
                  </p>
                </div>
              </div>

              {/* Support Box */}
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                <div className="flex items-center gap-2 text-yellow-800 font-bold text-xs mb-1">
                  <i className="fas fa-headset" /> ต้องการความช่วยเหลือ?
                </div>
                <p className="text-[10px] sm:text-[11px] text-yellow-700 leading-snug">ติดต่อศูนย์บริการข้อมูล กพร. โทร 0-2202-3555</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - อยู่ล่างสุดเสมอ แต่ถ้าหน้าจอสั้นจะต่อท้ายเนื้อหาลงไป */}
      <footer className="relative z-20 w-full bg-black/80 text-gray-400 py-3 text-center text-[10px] sm:text-xs backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4">
          &copy; 2025 กรมอุตสาหกรรมพื้นฐานและการเหมืองแร่ (DPIM). สงวนลิขสิทธิ์.
        </div>
      </footer>
    </div>
  );
}