import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  TrendingUp, 
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  FileSpreadsheet
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

  const menuItems = [
    { id: 'overview', label: 'Tổng Quan', icon: LayoutDashboard },
    { id: 'products', label: 'Quản Lý Sản Phẩm', icon: Package },
    { id: 'users', label: 'Quản Lý Người Dùng', icon: Users },
    { id: 'inventory', label: 'Nhập/Xuất Hàng', icon: TrendingUp },
    { id: 'expenses', label: 'Quản Lý Chi Phí', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen sticky top-0">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 bg-green-100 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-gray-900">Admin Panel</div>
                <div className="text-xs text-gray-500">MỘC AN</div>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id as AdminView)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentView === item.id
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
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
