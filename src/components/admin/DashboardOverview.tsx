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
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Tổng Quan</h1>
        <p className="text-gray-600">Thống kê tổng quan về cửa hàng MỘC AN</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            green: 'bg-green-100 text-green-600',
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600',
          };
          
          return (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Products */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-gray-900 mb-4">Sản Phẩm Tồn Kho Thấp</h2>
        <div className="space-y-3">
          {products
            .filter(p => (p.stock || 0) < 50)
            .slice(0, 5)
            .map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <div className="text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Tồn kho</div>
                  <div className={`${(product.stock || 0) < 30 ? 'text-red-600' : 'text-orange-600'}`}>
                    {product.stock || 0} sản phẩm
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Users Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-gray-900 mb-4">Người Dùng Mới Nhất</h2>
        <div className="space-y-3">
          {users.slice(0, 5).map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                {user.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
