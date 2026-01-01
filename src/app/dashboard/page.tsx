'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">ภาพรวมระบบ (System Overview)</h1>
          <p className="text-sm text-gray-600">ข้อมูล ณ วันที่ {currentTime}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors">
            <i className="fas fa-sync-alt mr-2"></i>
            Refresh
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors">
            <i className="fas fa-plus mr-2"></i>
            สร้างการแจ้งเตือน
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Cloud Server Status */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-cloud text-green-600"></i>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Cloud Server Status</h3>
              <p className="text-lg font-bold text-green-600">Online (99.9%)</p>
              <p className="text-xs text-gray-500">Node Status: 12/12</p>
            </div>
          </div>
        </div>

        {/* Active Directory */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-users text-blue-600"></i>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Active Directory</h3>
              <p className="text-lg font-bold text-blue-600">Connected</p>
              <p className="text-xs text-gray-500">Sync 2 mins ago</p>
            </div>
          </div>
        </div>

        {/* LDAP Latency */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-tachometer-alt text-yellow-600"></i>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">LDAP Latency</h3>
              <p className="text-lg font-bold text-yellow-600">24 ms</p>
              <p className="text-xs text-gray-500">Performance: Excellent</p>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-exclamation-triangle text-red-600"></i>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">System Alerts</h3>
              <p className="text-lg font-bold text-red-600">2 Warnings</p>
              <p className="text-xs text-gray-500">Disk Space {'>'} 80%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Load Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              <i className="fas fa-chart-line mr-2"></i>
              ปริมาณการใช้งาน (Traffic Load)
            </h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-800 text-white text-xs rounded">Hour</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded hover:bg-gray-300">Day</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded hover:bg-gray-300">Week</button>
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 600 200">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              <path
                d="M 0 150 Q 100 120 150 100 T 300 80 T 450 120 T 600 90"
                stroke="#10b981"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 0 150 Q 100 120 150 100 T 300 80 T 450 120 T 600 90 L 600 200 L 0 200 Z"
                fill="url(#gradient)"
              />
            </svg>
            <div className="absolute bottom-4 left-4 text-xs text-gray-500">
              08:00 - 14:00
            </div>
          </div>
        </div>

        {/* Storage Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            <i className="fas fa-hdd mr-2"></i>
            สถานะพื้นที่เก็บข้อมูล (Cloud)
          </h3>
          
          {/* Pie Chart Placeholder */}
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="10"
                        strokeDasharray="125.6" strokeDashoffset="31.4"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="10"
                        strokeDasharray="125.6" strokeDashoffset="94.2"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="10"
                        strokeDasharray="125.6" strokeDashoffset="113"/>
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                <span>Used Space</span>
              </div>
              <span className="font-medium">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span>Free Space</span>
              </div>
              <span className="font-medium">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                <span>Reserved</span>
              </div>
              <span className="font-medium">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Attempts Chart */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          <i className="fas fa-shield-alt mr-2"></i>
          สถิติการเข้าสู่ระบบผ่าน AD/LDAP (รายสัปดาห์)
        </h3>
        
        {/* Bar Chart */}
        <div className="flex items-end justify-between h-40 px-4">
          <div className="flex flex-col items-center">
            <div className="w-12 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
            <div className="w-12 bg-red-500 rounded-t mt-1" style={{height: '20%'}}></div>
            <span className="text-xs text-gray-600 mt-2">Mon</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 bg-blue-500 rounded-t" style={{height: '80%'}}></div>
            <div className="w-12 bg-red-500 rounded-t mt-1" style={{height: '15%'}}></div>
            <span className="text-xs text-gray-600 mt-2">Tue</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 bg-blue-500 rounded-t" style={{height: '90%'}}></div>
            <div className="w-12 bg-red-500 rounded-t mt-1" style={{height: '10%'}}></div>
            <span className="text-xs text-gray-600 mt-2">Wed</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 bg-blue-500 rounded-t" style={{height: '95%'}}></div>
            <div className="w-12 bg-red-500 rounded-t mt-1" style={{height: '25%'}}></div>
            <span className="text-xs text-gray-600 mt-2">Thu</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 bg-blue-500 rounded-t" style={{height: '85%'}}></div>
            <div className="w-12 bg-red-500 rounded-t mt-1" style={{height: '5%'}}></div>
            <span className="text-xs text-gray-600 mt-2">Fri</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span>Successful Logins</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span>Failed Attempts</span>
          </div>
        </div>
      </div>
    </div>
  );
}