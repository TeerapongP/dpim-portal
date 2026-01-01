'use client';

import { useState } from 'react';
import Navbar from '@/components/DPIMNavbar';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function DashboardPage() {
  const [user] = useState({
    name: 'นายสมชาย ใจดี',
    role: 'เจ้าหน้าที่ระบบ',
    avatar: undefined // You can add avatar URL here
  });

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    // Redirect to login
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">แดชบอร์ด</h1>
          <p className="text-gray-600">ภาพรวมระบบสารสนเทศ กรมการแพทย์</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-blue-100">ผู้ใช้งานทั้งหมด</div>
              </div>
              <i className="pi pi-users text-3xl text-blue-200"></i>
            </div>
          </Card>

          <Card className="bg-green-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">567</div>
                <div className="text-green-100">ผู้ใช้งานออนไลน์</div>
              </div>
              <i className="pi pi-globe text-3xl text-green-200"></i>
            </div>
          </Card>

          <Card className="bg-orange-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-orange-100">รายงานใหม่</div>
              </div>
              <i className="pi pi-file text-3xl text-orange-200"></i>
            </div>
          </Card>

          <Card className="bg-purple-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-purple-100">การแจ้งเตือน</div>
              </div>
              <i className="pi pi-bell text-3xl text-purple-200"></i>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Statistics Placeholder */}
          <Card title="สถิติการใช้งาน" className="h-96">
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
              <div className="text-center text-gray-500">
                <i className="pi pi-chart-line text-4xl mb-4"></i>
                <p>แผนภูมิสถิติการใช้งาน</p>
                <p className="text-sm">จะแสดงข้อมูลเมื่อมีการเชื่อมต่อฐานข้อมูล</p>
              </div>
            </div>
          </Card>

          {/* Recent Activities */}
          <Card title="กิจกรรมล่าสุด">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <i className="pi pi-user-plus text-green-500"></i>
                <div>
                  <div className="font-medium">ผู้ใช้ใหม่ลงทะเบียน</div>
                  <div className="text-sm text-gray-500">5 นาทีที่แล้ว</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <i className="pi pi-file-upload text-blue-500"></i>
                <div>
                  <div className="font-medium">อัปโหลดรายงานใหม่</div>
                  <div className="text-sm text-gray-500">15 นาทีที่แล้ว</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <i className="pi pi-cog text-orange-500"></i>
                <div>
                  <div className="font-medium">อัปเดตระบบ</div>
                  <div className="text-sm text-gray-500">1 ชั่วโมงที่แล้ว</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card title="การดำเนินการด่วน" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              label="สร้างรายงาน"
              icon="pi pi-plus"
              className="p-button-outlined h-20 flex-col"
            />
            <Button
              label="จัดการผู้ใช้"
              icon="pi pi-users"
              className="p-button-outlined h-20 flex-col"
            />
            <Button
              label="ตั้งค่าระบบ"
              icon="pi pi-cog"
              className="p-button-outlined h-20 flex-col"
            />
            <Button
              label="ดูสถิติ"
              icon="pi pi-chart-bar"
              className="p-button-outlined h-20 flex-col"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}