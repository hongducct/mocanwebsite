import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductGridProps {
  products: Product[];
  limit?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export function ProductGrid({ products, limit, showViewAll, onViewAll }: ProductGridProps) {
  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-2 sm:mb-3">Sản Phẩm Của Chúng Tôi</h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
          Khám phá bộ sưu tập trà thảo mộc và dược liệu thiên nhiên, 
          được tuyển chọn kỹ lưỡng từ các vùng nguyên liệu chất lượng cao
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
        {displayProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-amber-50">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 space-y-2">
                <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                <Badge className="bg-green-600 text-white text-xs">
                  {product.category}
                </Badge>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-1">{product.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                {product.description}
              </p>

              {product.benefits && product.benefits.length > 0 && (
                <div className="mb-3 sm:mb-4 flex flex-wrap gap-1">
                  {product.benefits.slice(0, 2).map((benefit, index) => (
                    <span
                      key={index}
                      className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 bg-green-50 text-green-700 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="text-base sm:text-lg font-semibold text-green-600">
                  {product.price.toLocaleString('vi-VN')}₫
                </div>
                {product.isFeatured && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                    Nổi bật
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-xs sm:text-sm py-2 sm:py-2.5">
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Đặt Hàng</span>
                  <span className="sm:hidden">Đặt</span>
                </Button>
                <Button variant="outline" size="icon" className="border-green-600 text-green-600 hover:bg-green-50 w-10 sm:w-auto">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showViewAll && onViewAll && (
        <div className="text-center pt-4 sm:pt-8 px-4">
          <Button
            onClick={onViewAll}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 text-sm sm:text-base"
          >
            Xem Tất Cả Sản Phẩm
          </Button>
        </div>
      )}
    </div>
  );
}
