import { Leaf, Heart, Award, Package } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-amber-50 opacity-60"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm">
              ✨ Thiên nhiên chăm sóc sức khỏe ✨
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
              Trà Thảo Mộc & Dược Liệu
              <span className="block text-emerald-600 mt-1 sm:mt-2">MỘC AN</span>
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0">
              Mang đến những sản phẩm trà thảo mộc và dược liệu thiên nhiên chất lượng cao, 
              giúp bảo vệ và nâng cao sức khỏe cho bạn và gia đình.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-medium text-gray-900">100% Tự Nhiên</div>
                  <div className="text-xs sm:text-sm text-gray-500">Không hóa chất</div>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-medium text-gray-900">Chất Lượng Cao</div>
                  <div className="text-xs sm:text-sm text-gray-500">Kiểm định an toàn</div>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-medium text-gray-900">Tốt Cho Sức Khỏe</div>
                  <div className="text-xs sm:text-sm text-gray-500">Công dụng rõ ràng</div>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-medium text-gray-900">Đóng Gói Cẩn Thận</div>
                  <div className="text-xs sm:text-sm text-gray-500">Giao hàng nhanh</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1707915317391-2d9e56a93541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBoZXJic3xlbnwxfHx8fDE3NjMzNDYzODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Trà thảo mộc MỘC AN"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-green-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-emerald-400 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
