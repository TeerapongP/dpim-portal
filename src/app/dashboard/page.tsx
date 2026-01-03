'use client';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import React, { useState, useEffect } from 'react';
import PrimePagination from '@/components/PrimePagination';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

// --- Mock Server Data ---
const generateServerData = () => {
  const serverTypes = [
    { type: 'ACTIVE DIRECTORY', color: 'bg-blue-100 text-blue-800' },
    { type: 'CLOUD DATABASE', color: 'bg-purple-100 text-purple-800' },
    { type: 'WEB SERVER', color: 'bg-green-100 text-green-800' },
    { type: 'FILE SERVER', color: 'bg-orange-100 text-orange-800' },
    { type: 'MAIL SERVER', color: 'bg-red-100 text-red-800' },
    { type: 'DNS SERVER', color: 'bg-indigo-100 text-indigo-800' },
    { type: 'BACKUP SERVER', color: 'bg-gray-100 text-gray-800' },
    { type: 'MONITORING', color: 'bg-teal-100 text-teal-800' }
  ];

  const statuses = [
    { status: 'Normal', color: 'text-green-600', bgColor: 'bg-green-100', icon: 'pi-check-circle' },
    { status: 'Warning', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: 'pi-exclamation-triangle' },
    { status: 'High Load', color: 'text-orange-600', bgColor: 'bg-orange-100', icon: 'pi-exclamation-circle' },
    { status: 'Critical', color: 'text-red-600', bgColor: 'bg-red-100', icon: 'pi-times-circle' },
    { status: 'Maintenance', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: 'pi-cog' }
  ];

  // Simple seeded random function for consistent results
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const servers = [];
  for (let i = 1; i <= 250; i++) {
    const serverType = serverTypes[Math.floor(seededRandom(i * 7) * serverTypes.length)];
    const status = statuses[Math.floor(seededRandom(i * 11) * statuses.length)];
    const load = Math.floor(seededRandom(i * 13) * 100);
    
    // Generate consistent timestamps
    const baseTime = new Date('2024-01-01T00:00:00Z').getTime();
    const randomMinutes = Math.floor(seededRandom(i * 17) * 1440); // Minutes in last 24 hours
    const lastUpdate = new Date(baseTime + randomMinutes * 60000);
    
    servers.push({
      id: `SRV-DPIM-${i.toString().padStart(2, '0')}`,
      name: `SRV-DPIM-${i.toString().padStart(2, '0')}`,
      serviceType: serverType.type,
      serviceTypeColor: serverType.color,
      status: status.status,
      statusColor: status.color,
      statusBgColor: status.bgColor,
      statusIcon: status.icon,
      lastUpdate: lastUpdate.toLocaleString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      load: load,
      loadColor: load > 80 ? 'bg-red-500' : load > 60 ? 'bg-yellow-500' : 'bg-green-500'
    });
  }
  return servers;
};

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [allServers, setAllServers] = useState<any[]>([]);
  const [filteredServers, setFilteredServers] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize servers only on client side
  useEffect(() => {
    setIsClient(true);
    const servers = generateServerData();
    setAllServers(servers);
    setFilteredServers(servers);

    // Check if mobile screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Update currentPage when it changes from parent
  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  // Filter servers based on status
  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredServers(allServers);
    } else {
      setFilteredServers(allServers.filter(server => server.status === statusFilter));
    }
    setCurrentPage(1); // Reset to first page when filter changes
  }, [statusFilter, allServers]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredServers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentServers = filteredServers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusCounts = () => {
    const counts = {
      All: allServers.length,
      Normal: allServers.filter(s => s.status === 'Normal').length,
      Warning: allServers.filter(s => s.status === 'Warning').length,
      'High Load': allServers.filter(s => s.status === 'High Load').length,
      Critical: allServers.filter(s => s.status === 'Critical').length,
      Maintenance: allServers.filter(s => s.status === 'Maintenance').length
    };
    return counts;
  };

  const getFilteredStatusCounts = () => {
    const counts = {
      All: filteredServers.length,
      Normal: filteredServers.filter(s => s.status === 'Normal').length,
      Warning: filteredServers.filter(s => s.status === 'Warning').length,
      'High Load': filteredServers.filter(s => s.status === 'High Load').length,
      Critical: filteredServers.filter(s => s.status === 'Critical').length,
      Maintenance: filteredServers.filter(s => s.status === 'Maintenance').length
    };
    return counts;
  };

  const getServiceTypeCounts = () => {
    const typeCounts: { [key: string]: number } = {};
    filteredServers.forEach(server => {
      typeCounts[server.serviceType] = (typeCounts[server.serviceType] || 0) + 1;
    });
    return typeCounts;
  };

  const getAverageLoad = () => {
    if (filteredServers.length === 0) return 0;
    return Math.round(filteredServers.reduce((sum, s) => sum + s.load, 0) / filteredServers.length);
  };

  const getOnlinePercentage = () => {
    if (filteredServers.length === 0) return '0.0';
    const onlineCount = filteredServers.filter(s => s.status === 'Normal').length;
    return ((onlineCount / filteredServers.length) * 100).toFixed(1);
  };

  const statusCounts = getStatusCounts();
  const filteredStatusCounts = getFilteredStatusCounts();
  const serviceTypeCounts = getServiceTypeCounts();
  const averageLoad = getAverageLoad();
  const onlinePercentage = getOnlinePercentage();

  // Template functions for DataTable columns
  const serviceTypeTemplate = (rowData: any) => {
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${rowData.serviceTypeColor}`}>
        {rowData.serviceType}
      </span>
    );
  };

  const statusTemplate = (rowData: any) => {
    return (
      <div className="flex items-center gap-2">
        <i className={`pi ${rowData.statusIcon} ${rowData.statusColor}`}></i>
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${rowData.statusBgColor} ${rowData.statusColor}`}>
          {rowData.status}
        </span>
      </div>
    );
  };

  const loadTemplate = (rowData: any) => {
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${rowData.loadColor}`}
            style={{ width: `${rowData.load}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-700">{rowData.load}%</span>
      </div>
    );
  };

  const actionTemplate = (rowData: any) => {
    return (
      <div className="flex items-center gap-2">
        <Button
          icon="pi pi-eye"
          className="w-8 h-8 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg transform hover:scale-105 active:scale-95"
          tooltip="ดูรายละเอียด"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-cog"
          className="w-8 h-8 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg transform hover:scale-105 active:scale-95"
          tooltip="ตั้งค่า"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-refresh"
          className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg transform hover:scale-105 active:scale-95"
          tooltip="รีสตาร์ท"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  // Dropdown options for status filter - show counts from all servers, not filtered
  const statusOptions = [
    { label: `ทั้งหมด (${statusCounts.All})`, value: 'All' },
    { label: `Normal (${statusCounts.Normal})`, value: 'Normal' },
    { label: `Warning (${statusCounts.Warning})`, value: 'Warning' },
    { label: `High Load (${statusCounts['High Load']})`, value: 'High Load' },
    { label: `Critical (${statusCounts.Critical})`, value: 'Critical' },
    { label: `Maintenance (${statusCounts.Maintenance})`, value: 'Maintenance' }
  ];

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <i className="pi pi-spin pi-spinner text-4xl text-emerald-600 mb-4"></i>
            <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <i className="pi pi-server text-red-500"></i>
            <span className="hidden sm:inline">รายงานสถานะ Server (Drill-Down)</span>
            <span className="sm:hidden">Server Status</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">ข้อมูล ณ วันที่ {currentTime}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <Dropdown 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.value)}
            options={statusOptions}
            className="w-full sm:w-64"
            placeholder="เลือกสถานะ"
            showClear={statusFilter !== 'All'}
            filter
            filterBy="label"
            emptyFilterMessage="ไม่พบสถานะที่ค้นหา"
          />
          <Button
            icon="pi pi-download"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm w-full sm:w-auto"
          >
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">
              <i className="pi pi-download"></i>
            </span>
          </Button>
        </div>
      </div>


      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="shadow-sm border-0">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
              <i className="pi pi-cloud text-green-600 text-lg sm:text-xl"></i>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">Cloud Server Status</h3>
              <p className="text-lg sm:text-xl font-bold text-green-600">Online ({onlinePercentage}%)</p>
              <p className="text-xs text-gray-500 truncate">Node Status: {filteredStatusCounts.Normal}/{filteredStatusCounts.All}</p>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm border-0">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
              <i className="pi pi-users text-blue-600 text-lg sm:text-xl"></i>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">Active Directory</h3>
              <p className="text-lg sm:text-xl font-bold text-blue-600">Connected</p>
              <p className="text-xs text-gray-500 truncate">AD Servers: {serviceTypeCounts['ACTIVE DIRECTORY'] || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm border-0">
          <div className="flex items-center">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 ${
              averageLoad > 80 ? 'bg-red-100' : averageLoad > 60 ? 'bg-yellow-100' : 'bg-green-100'
            }`}>
              <i className={`pi pi-chart-line text-lg sm:text-xl ${
                averageLoad > 80 ? 'text-red-600' : averageLoad > 60 ? 'text-yellow-600' : 'text-green-600'
              }`}></i>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">Average Load</h3>
              <p className={`text-lg sm:text-xl font-bold ${
                averageLoad > 80 ? 'text-red-600' : averageLoad > 60 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {averageLoad}%
              </p>
              <p className="text-xs text-gray-500 truncate">
                Performance: {averageLoad > 80 ? 'Critical' : averageLoad > 60 ? 'Warning' : 'Good'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm border-0">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
              <i className="pi pi-exclamation-triangle text-red-600 text-lg sm:text-xl"></i>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">System Alerts</h3>
              <p className="text-lg sm:text-xl font-bold text-red-600">{filteredStatusCounts.Critical + filteredStatusCounts.Warning} Warnings</p>
              <p className="text-xs text-gray-500 truncate">Critical: {filteredStatusCounts.Critical}, Warning: {filteredStatusCounts.Warning}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Server Status Distribution Chart */}
        <Card 
          title={
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                <i className="pi pi-chart-bar mr-2"></i>
                <span className="hidden sm:inline">การกระจายสถานะเซิร์ฟเวอร์</span>
                <span className="sm:hidden">สถานะเซิร์ฟเวอร์</span>
                {statusFilter !== 'All' && (
                  <span className="ml-2 text-xs sm:text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {statusFilter}
                  </span>
                )}
              </h3>
              <div className="flex gap-1 sm:gap-2">
                <button className="px-2 sm:px-3 py-1 bg-gray-800 text-white text-xs rounded">Real-time</button>
                <button className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded hover:bg-gray-300">Daily</button>
                <button className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded hover:bg-gray-300 hidden sm:block">Weekly</button>
              </div>
            </div>
          }
          className="xl:col-span-2 shadow-sm border-0"
        >
          <div className="h-48 sm:h-64">
            <Bar
              data={{
                labels: ['Normal', 'Warning', 'High Load', 'Critical', 'Maintenance'],
                datasets: [
                  {
                    label: 'จำนวนเซิร์ฟเวอร์',
                    data: [
                      filteredStatusCounts.Normal,
                      filteredStatusCounts.Warning,
                      filteredStatusCounts['High Load'],
                      filteredStatusCounts.Critical,
                      filteredStatusCounts.Maintenance
                    ],
                    backgroundColor: [
                      'rgba(34, 197, 94, 0.8)',
                      'rgba(234, 179, 8, 0.8)',
                      'rgba(249, 115, 22, 0.8)',
                      'rgba(239, 68, 68, 0.8)',
                      'rgba(59, 130, 246, 0.8)'
                    ],
                    borderColor: [
                      'rgb(34, 197, 94)',
                      'rgb(234, 179, 8)',
                      'rgb(249, 115, 22)',
                      'rgb(239, 68, 68)',
                      'rgb(59, 130, 246)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                      label: function(context: any) {
                        const percentage = ((context.parsed.y / filteredStatusCounts.All) * 100).toFixed(1);
                        return `${context.parsed.y} เซิร์ฟเวอร์ (${percentage}%)`;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                      color: '#6b7280',
                      font: {
                        size: window.innerWidth < 640 ? 10 : 12
                      }
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      color: '#6b7280',
                      font: {
                        size: window.innerWidth < 640 ? 10 : 12,
                        weight: 'bold'
                      },
                      maxRotation: window.innerWidth < 640 ? 45 : 0
                    }
                  }
                }
              }}
            />
          </div>
        </Card>

        {/* Service Type Distribution */}
        <Card 
          title={
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
              <i className="pi pi-chart-pie mr-2"></i>
              <span className="hidden sm:inline">ประเภทบริการ</span>
              <span className="sm:hidden">บริการ</span>
              {statusFilter !== 'All' && (
                <span className="ml-2 text-xs sm:text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {statusFilter}
                </span>
              )}
            </h3>
          }
          className="shadow-sm border-0"
        >
          <div className="h-48 sm:h-64">
            <Doughnut
              data={{
                labels: Object.keys(serviceTypeCounts).slice(0, 6),
                datasets: [
                  {
                    data: Object.keys(serviceTypeCounts).slice(0, 6).map(type => serviceTypeCounts[type]),
                    backgroundColor: [
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(16, 185, 129, 0.8)',
                      'rgba(245, 158, 11, 0.8)',
                      'rgba(239, 68, 68, 0.8)',
                      'rgba(139, 92, 246, 0.8)',
                      'rgba(6, 182, 212, 0.8)'
                    ],
                    borderColor: [
                      'rgb(59, 130, 246)',
                      'rgb(16, 185, 129)',
                      'rgb(245, 158, 11)',
                      'rgb(239, 68, 68)',
                      'rgb(139, 92, 246)',
                      'rgb(6, 182, 212)'
                    ],
                    borderWidth: 2,
                    hoverOffset: 8
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: window.innerWidth < 640 ? 10 : 20,
                      usePointStyle: true,
                      font: {
                        size: window.innerWidth < 640 ? 9 : 11
                      },
                      generateLabels: function(chart: any) {
                        const data = chart.data;
                        if (data.labels && data.datasets.length) {
                          return data.labels.map((label: string, i: number) => {
                            const count = data.datasets[0].data[i] as number;
                            const percentage = ((count / filteredStatusCounts.All) * 100).toFixed(1);
                            const shortLabel = window.innerWidth < 640 ? 
                              label.split(' ')[0] : label;
                            return {
                              text: `${shortLabel} (${percentage}%)`,
                              fillStyle: (data.datasets[0].backgroundColor as string[])[i],
                              strokeStyle: (data.datasets[0].borderColor as string[])[i],
                              lineWidth: 2,
                              pointStyle: 'circle',
                              hidden: false,
                              index: i
                            };
                          });
                        }
                        return [];
                      }
                    }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                      label: function(context: any) {
                        const percentage = ((context.parsed / filteredStatusCounts.All) * 100).toFixed(1);
                        return `${context.parsed} เซิร์ฟเวอร์ (${percentage}%)`;
                      }
                    }
                  }
                },
                cutout: '60%'
              }}
            />
          </div>
        </Card>
      </div>

      {/* Performance Trend Chart */}
      <Card 
        title={
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
            <i className="pi pi-chart-line mr-2"></i>
            <span className="hidden sm:inline">แนวโน้มประสิทธิภาพระบบ</span>
            <span className="sm:hidden">ประสิทธิภาพ</span>
          </h3>
        }
        className="mb-6 sm:mb-8 shadow-sm border-0"
      >
        <div className="h-48 sm:h-64">
          <Line
            data={{
              labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
              datasets: [
                {
                  label: 'ประสิทธิภาพระบบ (%)',
                  data: (() => {
                    const basePerformance = 100 - averageLoad;
                    return [
                      Math.max(20, basePerformance - 10),
                      Math.max(20, basePerformance - 5),
                      Math.max(20, basePerformance + 5),
                      Math.max(20, basePerformance),
                      Math.max(20, basePerformance + 8),
                      Math.max(20, basePerformance - 3),
                      Math.max(20, basePerformance + 2)
                    ];
                  })(),
                  borderColor: 'rgb(16, 185, 129)',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  borderWidth: 3,
                  fill: true,
                  tension: 0.4,
                  pointBackgroundColor: 'rgb(16, 185, 129)',
                  pointBorderColor: 'white',
                  pointBorderWidth: 2,
                  pointRadius: window.innerWidth < 640 ? 4 : 6,
                  pointHoverRadius: window.innerWidth < 640 ? 6 : 8,
                  pointHoverBackgroundColor: 'rgb(16, 185, 129)',
                  pointHoverBorderColor: 'white',
                  pointHoverBorderWidth: 3
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleColor: 'white',
                  bodyColor: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1,
                  cornerRadius: 8,
                  callbacks: {
                    label: function(context: any) {
                      return `ประสิทธิภาพ: ${context.parsed.y.toFixed(1)}%`;
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                  },
                  ticks: {
                    color: '#6b7280',
                    font: {
                      size: window.innerWidth < 640 ? 10 : 12
                    },
                    callback: function(value: any) {
                      return value + '%';
                    }
                  }
                },
                x: {
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                  },
                  ticks: {
                    color: '#6b7280',
                    font: {
                      size: window.innerWidth < 640 ? 10 : 12
                    }
                  }
                }
              },
              interaction: {
                intersect: false,
                mode: 'index'
              }
            }}
          />
        </div>
        
        {/* Performance Summary */}
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">ประสิทธิภาพเฉลี่ย: {100 - averageLoad}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                averageLoad > 80 ? 'bg-red-500' : averageLoad > 60 ? 'bg-yellow-500' : 'bg-green-500'
              } animate-pulse`}></div>
              <span className="text-gray-600">
                สถานะ: {averageLoad > 80 ? 'Critical' : averageLoad > 60 ? 'Warning' : 'Good'}
              </span>
            </div>
          </div>
          <div className="text-gray-500 text-xs sm:text-sm">
            อัปเดตล่าสุด: {currentTime}
          </div>
        </div>
      </Card>

      {/* Server Table */}
      <Card className="shadow-sm border-0 overflow-hidden">
        <div className="overflow-x-auto">
          <DataTable 
            value={currentServers}
            stripedRows
            showGridlines
            size="small"
            className="p-datatable-sm"
            emptyMessage={`ไม่พบข้อมูลเซิร์ฟเวอร์${statusFilter !== 'All' ? ` สำหรับสถานะ "${statusFilter}"` : ''}`}
            loading={!isClient}
            loadingIcon="pi pi-spin pi-spinner"
            header={
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2">
                <span className="text-gray-600 font-medium text-sm">
                  แสดงรายการ {currentServers.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredServers.length)} จาก {filteredServers.length} รายการ
                </span>
                <span className="text-gray-500 text-xs sm:text-sm">
                  {itemsPerPage} รายการต่อหน้า
                </span>
              </div>
            }
            scrollable
            scrollHeight="flex"
          >
            <Column 
              field="name" 
              header="SERVER NAME"
              headerClassName="bg-gray-50 text-gray-600 font-semibold text-xs uppercase tracking-wider"
              className="font-medium text-gray-900 text-sm"
              sortable
              style={{ minWidth: '120px' }}
            />
            <Column 
              field="serviceType" 
              header="SERVICE TYPE"
              headerClassName="bg-gray-50 text-gray-600 font-semibold text-xs uppercase tracking-wider"
              body={serviceTypeTemplate}
              sortable
              style={{ minWidth: '140px' }}
            />
            <Column 
              field="status" 
              header="STATUS"
              headerClassName="bg-gray-50 text-gray-600 font-semibold text-xs uppercase tracking-wider"
              body={statusTemplate}
              sortable
              style={{ minWidth: '120px' }}
            />
            <Column 
              field="lastUpdate" 
              header="LAST UPDATE"
              headerClassName="bg-gray-50 text-gray-600 font-semibold text-xs uppercase tracking-wider"
              className="text-xs sm:text-sm text-gray-600"
              sortable
              style={{ minWidth: '140px' }}
            />
            <Column 
              field="load" 
              header="LOAD"
              headerClassName="bg-gray-50 text-gray-600 font-semibold text-xs uppercase tracking-wider"
              body={loadTemplate}
              sortable
              style={{ minWidth: '120px' }}
            />
            <Column 
              header="ACTION"
              headerClassName="bg-gray-50 text-gray-600 font-semibold text-xs uppercase tracking-wider"
              body={actionTemplate}
              style={{ minWidth: '180px', width: '180px' }}
            />
          </DataTable>
        </div>
        
        {/* Beautiful PrimeReact Pagination Component */}
        <PrimePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredServers.length}
          onPageChange={handlePageChange}
          showFirstLast={!isMobile}
          maxVisiblePages={isMobile ? 3 : 5}
          showPageInfo={true}
          itemsPerPage={itemsPerPage}
        />
      </Card>
    </div>
  );
}