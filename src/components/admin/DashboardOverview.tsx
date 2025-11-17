import { Package, Users, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react';
import { Product, User } from '../../App';

interface DashboardOverviewProps {
  products: Product[];
  users: User[];
}

export function DashboardOverview({ products, users }: DashboardOverviewProps) {
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0) * 0.3), 0);
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalProducts = products.length;
  const totalUsers = users.length;

  const stats = [
    {
      label: 'Tổng Doanh Thu',
      value: `${(totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'green',
      change: '+12.5%',
    },
    {
      label: 'Sản Phẩm',
      value: totalProducts,
      icon: Package,
      color: 'blue',
      change: '+3',
    },
    {
      label: 'Người Dùng',
      value: totalUsers,
      icon: Users,
      color: 'purple',
      change: '+5',
    },
    {
      label: 'Tồn Kho',
      value: totalStock,
      icon: TrendingUp,
      color: 'orange',
      change: '-8',
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Tổng Quan</h1>
        <p className="text-sm sm:text-base text-gray-600">Thống kê tổng quan về cửa hàng MỘC AN</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            green: 'bg-green-100 text-green-600',
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600',
          };
          
          return (
            <div key={stat.label} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className={`text-xs sm:text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Products */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Sản Phẩm Tồn Kho Thấp</h2>
        <div className="space-y-2 sm:space-y-3">
          {products
            .filter(p => (p.stock || 0) < 50)
            .slice(0, 5)
            .map((product) => (
              <div key={product.id} className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <img src={product.image} alt={product.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{product.name}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">{product.category}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="text-[10px] sm:text-xs text-gray-500">Tồn kho</div>
                  <div className={`text-xs sm:text-sm font-medium ${(product.stock || 0) < 30 ? 'text-red-600' : 'text-orange-600'}`}>
                    {product.stock || 0} sp
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Users Overview */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Người Dùng Mới Nhất</h2>
        <div className="space-y-2 sm:space-y-3">
          {users.slice(0, 5).map((user) => (
            <div key={user.id} className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs sm:text-sm text-green-600 font-medium">{user.name.charAt(0)}</span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user.name}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 truncate">{user.email}</div>
                </div>
              </div>
              <div className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full flex-shrink-0 ml-2">
                {user.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
