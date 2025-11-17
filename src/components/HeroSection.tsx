import { Leaf, Heart, Award, Package } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-amber-50 opacity-60"></div>
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full">
              ✨ Thiên nhiên chăm sóc sức khỏe ✨
            </div>
            
            <h1 className="text-green-900">
              Trà Thảo Mộc & Dược Liệu
              <span className="block text-emerald-600">MỘC AN</span>
            </h1>
            
            <p className="text-gray-600 max-w-xl">
              Mang đến những sản phẩm trà thảo mộc và dược liệu thiên nhiên chất lượng cao, 
              giúp bảo vệ và nâng cao sức khỏe cho bạn và gia đình.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-900">100% Tự Nhiên</div>
                  <div className="text-sm text-gray-500">Không hóa chất</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-900">Chất Lượng Cao</div>
                  <div className="text-sm text-gray-500">Kiểm định an toàn</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-900">Tốt Cho Sức Khỏe</div>
                  <div className="text-sm text-gray-500">Công dụng rõ ràng</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-900">Đóng Gói Cẩn Thận</div>
                  <div className="text-sm text-gray-500">Giao hàng nhanh</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1707915317391-2d9e56a93541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBoZXJic3xlbnwxfHx8fDE3NjMzNDYzODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Trà thảo mộc MỘC AN"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-400 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
