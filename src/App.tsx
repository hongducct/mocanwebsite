import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturedProduct } from './components/FeaturedProduct';
import { ProductGrid } from './components/ProductGrid';
import { ChatWidget } from './components/ChatWidget';
import { ContactSection } from './components/ContactSection';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LoginDialog } from './components/LoginDialog';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  benefits?: string[];
  isFeatured?: boolean;
  stock?: number;
  cost?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Team Leader';
  createdAt: Date;
  status: 'active' | 'inactive';
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Hộp Set Trà Ngũ Vị',
    description: 'Bộ sưu tập 5 loại trà thảo mộc cao cấp, mang lại sức khỏe toàn diện cho cả gia đình',
    price: 100000,
    cost: 60000,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1612846213933-916a1f56d859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBzZXQlMjB3b29kZW58ZW58MXx8fHwxNzYzMzQ2MzgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Set Combo',
    benefits: ['Thanh nhiệt giải độc', 'Tăng cường sức đề kháng', 'Hỗ trợ tiêu hóa', 'An thần, ngủ ngon', 'Đẹp da từ bên trong'],
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Trà Hoa Cúc',
    description: 'Trà hoa cúc tự nhiên, thanh nhiệt, giải độc gan',
    price: 45000,
    cost: 25000,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1707915317391-2d9e56a93541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBoZXJic3xlbnwxfHx8fDE3NjMzNDYzODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Trà Thảo Mộc',
    benefits: ['Thanh nhiệt', 'Giải độc gan', 'Sáng mắt'],
  },
  {
    id: '3',
    name: 'Dược Liệu Ngũ Vị Tử',
    description: 'Ngũ vị tử cao cấp, bổ thận, tăng cường sinh lực',
    price: 80000,
    cost: 50000,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1627744514030-28d5c0170fba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGhlcmJzJTIwbWVkaWNpbmFsfGVufDF8fHx8MTc2MzM0NjM4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Dược Liệu',
    benefits: ['Bổ thận', 'Tăng sinh lực', 'Chống lão hóa'],
  },
  {
    id: '4',
    name: 'Trà Lá Sen',
    description: 'Trà lá sen nguyên chất, hỗ trợ giảm cân hiệu quả',
    price: 55000,
    cost: 30000,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1760074057745-9eaa5d50bc74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwdGVhJTIwbGVhdmVzfGVufDF8fHx8MTc2MzM0NjM4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Trà Thảo Mộc',
    benefits: ['Hỗ trợ giảm cân', 'Thanh lọc cơ thể', 'Làm đẹp da'],
  },
  {
    id: '5',
    name: 'Trà Gừng Mật Ong',
    description: 'Trà gừng pha mật ong tự nhiên, ấm bụng, tăng cường miễn dịch',
    price: 60000,
    cost: 35000,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1707915317391-2d9e56a93541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBoZXJic3xlbnwxfHx8fDE3NjMzNDYzODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Trà Thảo Mộc',
    benefits: ['Tăng miễn dịch', 'Ấm bụng', 'Trị cảm lạnh'],
  },
  {
    id: '6',
    name: 'Trà Atiso',
    description: 'Trà hoa atiso Đà Lạt, mát gan, giải nhiệt',
    price: 50000,
    cost: 28000,
    stock: 70,
    image: 'https://images.unsplash.com/photo-1707915317391-2d9e56a93541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBoZXJic3xlbnwxfHx8fDE3NjMzNDYzODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Trà Thảo Mộc',
    benefits: ['Mát gan', 'Giải nhiệt', 'Hỗ trợ tiêu hóa'],
  },
];

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Admin Team',
    email: 'admin@mocan.vn',
    role: 'Admin',
    createdAt: new Date('2023-01-15'),
    status: 'active',
  },
  {
    id: '2',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    role: 'Member',
    createdAt: new Date('2023-03-20'),
    status: 'active',
  },
  {
    id: '3',
    name: 'Trần Thị B',
    email: 'tranthib@gmail.com',
    role: 'Team Leader',
    createdAt: new Date('2023-02-10'),
    status: 'active',
  },
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'admin' | 'contact'>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const featuredProduct = products.find(p => p.isFeatured);

  const handleNavigate = (view: 'home' | 'products' | 'admin' | 'contact') => {
    if (view === 'admin') {
      if (!currentUser) {
        setShowLoginDialog(true);
        return;
      }
      if (currentUser.role !== 'Admin') {
        alert('Bạn không có quyền truy cập trang quản lý!');
        return;
      }
    }
    setCurrentView(view);
  };

  const handleLogin = (email: string, password: string) => {
    // Simple authentication - in real app, this would call an API
    const user = users.find(u => u.email === email);
    if (user && password === '123456') { // Demo password
      setCurrentUser(user);
      setShowLoginDialog(false);
      if (user.role === 'Admin') {
        setCurrentView('admin');
      }
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation 
        currentView={currentView} 
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
        onShowLogin={() => setShowLoginDialog(true)}
      />
      
      {currentView === 'home' && (
        <>
          <HeroSection />
          {featuredProduct && <FeaturedProduct product={featuredProduct} />}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <ProductGrid products={products} limit={6} showViewAll onViewAll={() => setCurrentView('products')} />
          </div>
          <ContactSection />
        </>
      )}

      {currentView === 'products' && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <ProductGrid products={products} />
        </div>
      )}

      {currentView === 'admin' && currentUser?.role === 'Admin' && (
        <AdminDashboard 
          products={products} 
          setProducts={setProducts}
          users={users}
          setUsers={setUsers}
        />
      )}

      {currentView === 'contact' && (
        <div className="py-8 sm:py-12">
          <ContactSection />
        </div>
      )}

      <Footer />
      <ChatWidget />
      
      <LoginDialog
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
