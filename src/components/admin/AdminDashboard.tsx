import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  TrendingUp, 
  DollarSign,
  Menu,
  X
} from 'lucide-react';

import { Product, User } from '../../App';
import { ProductManagement } from './ProductManagement';
import { UserManagement } from './UserManagement';
import { InventoryManagement } from './InventoryManagement';
import { ExpenseManagement } from './ExpenseManagement';
import { DashboardOverview } from './DashboardOverview';

interface AdminDashboardProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  users: User[];
  setUsers: (users: User[]) => void;
}

type AdminView = 'overview' | 'products' | 'users' | 'inventory' | 'expenses';

export function AdminDashboard({ products, setProducts, users, setUsers }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Tổng Quan', icon: LayoutDashboard },
    { id: 'products', label: 'Quản Lý Sản Phẩm', icon: Package },
    { id: 'users', label: 'Quản Lý Người Dùng', icon: Users },
    { id: 'inventory', label: 'Nhập/Xuất Hàng', icon: TrendingUp },
    { id: 'expenses', label: 'Quản Lý Chi Phí', icon: DollarSign },
  ];

  const handleViewChange = (view: AdminView) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header - CHỈ HIỆN Ở MOBILE */}
      <div className="bg-white shadow-sm sticky top-0 z-40 flex items-center justify-between lg:hidden lg:p-0 sm:p-4">
        <div className="flex items-center gap-2 lg:hidden">
          <div className="p-2 bg-green-100 rounded-lg lg:hidden">
            <LayoutDashboard className="w-5 h-5 text-green-600" />
          </div>
          <div className="lg:hidden">
            <div className="text-sm font-semibold text-gray-900">Admin Panel</div>
            <div className="text-[10px] text-gray-500">MỘC AN</div>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Container - FLEX ROW trên desktop */}
      <div className="lg:flex lg:h-screen">
        {/* Sidebar - BÊN TRÁI trên desktop */}
        <aside 
          className={`
            ${isSidebarOpen ? 'block' : 'hidden'} 
            lg:block 
            lg:w-64 
            lg:flex-shrink-0 
            bg-white 
            shadow-lg
            lg:overflow-y-auto
          `}
        >
          <div className="p-4 sm:p-6">
            {/* Desktop Header - CHỈ HIỆN Ở DESKTOP */}
            <div className="hidden lg:flex items-center gap-2 mb-8">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <LayoutDashboard className="w-6 h-6 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-gray-900 font-semibold truncate">Admin Panel</div>
                <div className="text-xs text-gray-500 truncate">MỘC AN</div>
              </div>
            </div>

            <nav className="space-y-1 sm:space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleViewChange(item.id as AdminView)}
                    className={`
                      w-full flex items-center gap-2 sm:gap-3 
                      px-3 sm:px-4 py-2.5 sm:py-3 
                      rounded-lg transition-all text-sm sm:text-base
                      ${currentView === item.id
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content - BÊN PHẢI trên desktop */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:overflow-y-auto">
          {currentView === 'overview' && (
            <DashboardOverview products={products} users={users} />
          )}
          {currentView === 'products' && (
            <ProductManagement products={products} setProducts={setProducts} />
          )}
          {currentView === 'users' && (
            <UserManagement users={users} setUsers={setUsers} />
          )}
          {currentView === 'inventory' && (
            <InventoryManagement products={products} setProducts={setProducts} />
          )}
          {currentView === 'expenses' && (
            <ExpenseManagement />
          )}
        </main>
      </div>
    </div>
  );
}