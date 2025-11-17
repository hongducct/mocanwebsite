import { Leaf, ShoppingBag, Settings, Phone, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../App';
import { Button } from './ui/button';

interface NavigationProps {
  currentView: 'home' | 'products' | 'admin' | 'contact';
  onNavigate: (view: 'home' | 'products' | 'admin' | 'contact') => void;
  currentUser: User | null;
  onLogout: () => void;
  onShowLogin: () => void;
}

export function Navigation({ currentView, onNavigate, currentUser, onLogout, onShowLogin }: NavigationProps) {
  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-green-800">MỘC AN</div>
              <div className="text-xs text-green-600">Trà Thảo Mộc & Dược Liệu</div>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'home' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span>Trang Chủ</span>
            </button>
            <button
              onClick={() => onNavigate('products')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'products' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Sản Phẩm</span>
            </button>
            
            {/* Only show Admin button if user is logged in and is Admin */}
            {currentUser?.role === 'Admin' && (
              <button
                onClick={() => onNavigate('admin')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'admin' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Quản Lý</span>
              </button>
            )}
            
            <button
              onClick={() => onNavigate('contact')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'contact' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Liên Hệ</span>
            </button>

            {/* User section */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                    <UserIcon className="w-4 h-4 text-green-600" />
                    <div className="text-sm">
                      <div className="text-gray-900">{currentUser.name}</div>
                      <div className="text-xs text-green-600">{currentUser.role}</div>
                    </div>
                  </div>
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Đăng Xuất
                  </Button>
                </>
              ) : (
                <Button
                  onClick={onShowLogin}
                  className="bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Đăng Nhập
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
