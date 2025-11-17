import { useState, useEffect } from 'react';
import { Leaf, ShoppingBag, Settings, Phone, LogIn, LogOut, User as UserIcon, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Đóng mobile menu khi resize lên desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Kiểm tra ngay khi component mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (view: 'home' | 'products' | 'admin' | 'contact') => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <button 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
          >
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-1.5 sm:p-2 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-semibold text-green-800 whitespace-nowrap">MỘC AN</div>
              <div className="text-[10px] sm:text-xs text-green-600 hidden sm:block whitespace-nowrap">Trà Thảo Mộc & Dược Liệu</div>
            </div>
          </button>

          {/* Desktop Navigation - Hiển thị NGANG trên desktop (>= 1024px) */}
          <div className="hidden lg:flex flex-row items-center gap-2 xl:gap-3 ml-auto">
            <button
              onClick={() => handleNavigate('home')}
              className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg transition-colors text-sm xl:text-base whitespace-nowrap ${
                currentView === 'home' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Leaf className="w-4 h-4 flex-shrink-0" />
              <span>Trang Chủ</span>
            </button>
            <button
              onClick={() => handleNavigate('products')}
              className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg transition-colors text-sm xl:text-base whitespace-nowrap ${
                currentView === 'products' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4 flex-shrink-0" />
              <span>Sản Phẩm</span>
            </button>
            
            {currentUser?.role === 'Admin' && (
              <button
                onClick={() => handleNavigate('admin')}
                className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg transition-colors text-sm xl:text-base whitespace-nowrap ${
                  currentView === 'admin' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4 flex-shrink-0" />
                <span>Quản Lý</span>
              </button>
            )}
            
            <button
              onClick={() => handleNavigate('contact')}
              className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg transition-colors text-sm xl:text-base whitespace-nowrap ${
                currentView === 'contact' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>Liên Hệ</span>
            </button>

            {/* Desktop User section */}
            <div className="flex items-center gap-2 ml-2 xl:ml-4 pl-2 xl:pl-4 border-l border-gray-200 flex-shrink-0">
              {currentUser ? (
                <>
                  <div className="hidden xl:flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg whitespace-nowrap">
                    <UserIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <div className="text-sm min-w-0">
                      <div className="text-gray-900 truncate">{currentUser.name}</div>
                      <div className="text-xs text-green-600">{currentUser.role}</div>
                    </div>
                  </div>
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 text-sm whitespace-nowrap"
                  >
                    <LogOut className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="hidden xl:inline">Đăng Xuất</span>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={onShowLogin}
                  className="bg-green-600 hover:bg-green-700 text-sm whitespace-nowrap"
                  size="sm"
                >
                  <LogIn className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="hidden xl:inline">Đăng Nhập</span>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Chỉ hiển thị trên mobile và tablet (< 1024px) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Chỉ hiển thị trên mobile và tablet (< 1024px) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 sm:px-6 py-4 space-y-2">
              <button
                onClick={() => handleNavigate('home')}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  currentView === 'home' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Leaf className="w-4 h-4" />
                <span>Trang Chủ</span>
              </button>
              <button
                onClick={() => handleNavigate('products')}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  currentView === 'products' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Sản Phẩm</span>
              </button>
              
              {currentUser?.role === 'Admin' && (
                <button
                  onClick={() => handleNavigate('admin')}
                  className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
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
                onClick={() => handleNavigate('contact')}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  currentView === 'contact' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Liên Hệ</span>
              </button>

              {/* Mobile User section */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {currentUser ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-3 bg-green-50 rounded-lg">
                      <UserIcon className="w-4 h-4 text-green-600" />
                      <div className="flex-1 text-sm">
                        <div className="text-gray-900 font-medium">{currentUser.name}</div>
                        <div className="text-xs text-green-600">{currentUser.role}</div>
                      </div>
                    </div>
                    <Button
                      onClick={onLogout}
                      variant="outline"
                      className="w-full text-red-600 hover:bg-red-50"
                      size="sm"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng Xuất
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={onShowLogin}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Đăng Nhập
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}