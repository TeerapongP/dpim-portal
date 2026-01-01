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
    <div className="fixed inset-0 w-screen h-screen flex flex-col overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=2070&auto=format&fit=crop')" }}
      />

      {/* Green Overlay */}
      <div className="absolute inset-0 w-full h-full bg-[#0b5232]/85 backdrop-blur-[2px] z-10"></div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative z-20">
        {/* Main Login Card */}
        <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[580px]">
          
          {/* Left Side: Form Section */}
          <div className="flex-[1.2] p-8 lg:p-14 flex flex-col justify-center bg-white">
            <div className="mb-8 text-left">
              <h3 className="text-3xl font-bold text-[#0b5232]">เข้าสู่ระบบ</h3>
              <p className="text-gray-400 text-sm mt-1 uppercase tracking-tight">DPIM Information System</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <span className="p-input-icon-left w-full">
                  <InputText 
                    placeholder="ชื่อผู้ใช้ / Username" 
                    className="w-full p-3.5 pl-11 bg-gray-50 border-gray-200 focus:border-[#0b5232] rounded-lg text-sm"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                  />
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="p-input-icon-left w-full">
                  <Password 
                    placeholder="รหัสผ่าน / Password" 
                    toggleMask 
                    feedback={false}
                    className="w-full"
                    inputClassName="w-full p-3.5 pl-11 bg-gray-50 border-gray-200 focus:border-[#0b5232] rounded-lg text-sm"
                    style={{ width: '100%' }}
                    value={formData.password}
                    onChange={(e: any) => handleInputChange('password', e.target.value)}
                  />
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-medium">
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
                className="w-full border-none p-3 font-semibold text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ 
                  backgroundColor: 'var(--dpim-green)',
                  borderColor: 'var(--dpim-green)'
                }}
              />
            </form>

            {/* Social Separator */}
            <div className="relative my-10 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <span className="relative bg-white px-4 text-[11px] text-gray-400 uppercase tracking-widest font-semibold">หรือเข้าใช้งานด้วยบัญชีอื่น</span>
            </div>

            {/* External Providers */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 p-2.5 rounded-lg text-white text-xs font-bold hover:brightness-110 shadow-sm transition-all"
                      style={{ backgroundColor: '#1a429b' }}>
                <i className="fas fa-fingerprint" /> ThaiID
              </button>
              <button type="button" className="flex items-center justify-center gap-2 p-2.5 rounded-lg text-white text-xs font-bold hover:brightness-110 shadow-sm transition-all"
                      style={{ backgroundColor: '#0d2551' }}>
                <i className="fas fa-mobile-screen text-xl" /> ทางรัฐ
              </button>
              <button type="button" className="flex items-center justify-center gap-2 p-2.5 rounded-lg text-white text-xs font-bold hover:brightness-110 shadow-sm transition-all"
                      style={{ backgroundColor: '#6f42c1' }}>
                <i className="fas fa-industry text-xl" /> i-Industry
              </button>
              <button type="button" className="flex items-center justify-center gap-2 p-2.5 rounded-lg text-white text-xs font-bold hover:brightness-110 shadow-sm transition-all"
                      style={{ backgroundColor: '#00b0e1' }}>
                <i className="fas fa-briefcase text-xl" /> Biz Portal
              </button>
            </div>
          </div>

          {/* Right Side: PDPA Information */}
          <div className="flex-1 bg-gray-50/50 p-8 lg:p-14 border-l border-gray-100 flex flex-col justify-start">
            <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-[#ffc107] pl-4 mb-8 uppercase tracking-wide">
              ข้อตกลงและเงื่อนไข (PDPA)
            </h3>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-shield-alt text-green-600 text-lg" />
                </div>
                <div className="flex flex-col">
                  <h6 className="font-bold text-xl text-gray-700">ความปลอดภัยข้อมูล</h6>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    ระบบมีการเก็บ Log การใช้งานตาม พ.ร.บ. คอมพิวเตอร์ฯ เพื่อตรวจสอบและรักษาความปลอดภัย
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-check text-yellow-600 text-lg" />
                </div>
                <div className="flex flex-col">
                  <h6 className="font-bold text-xl text-gray-700">การยืนยันตัวตน</h6>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    รองรับการเข้าใช้งานผ่าน ThaiID, ทางรัฐ และ i-Industry เพื่อความสะดวกและถูกต้องของข้อมูล
                  </p>
                </div>
              </div>

              {/* Support Box */}
              <div className="mt-8 p-5 bg-yellow-50 border border-yellow-100 rounded-xl">
                <div className="flex items-center gap-3 text-yellow-800 font-bold text-md mb-1">
                  <i className="fas fa-headset" /> ต้องการความช่วยเหลือ?
                </div>
                <p className="text-[11px] text-yellow-700">ติดต่อศูนย์บริการข้อมูล กพร. โทร 0-2202-3555</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer at bottom of screen */}
      <footer className="relative z-20 w-full bg-black/75 text-gray-300 py-3 text-center text-xs backdrop-blur-sm">
        &copy; 2025 กรมอุตสาหกรรมพื้นฐานและการเหมืองแร่ (DPIM). สงวนลิขสิทธิ์.
      </footer>
    </div>
  );
}