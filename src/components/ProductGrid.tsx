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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-green-900 mb-3">Sản Phẩm Của Chúng Tôi</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Khám phá bộ sưu tập trà thảo mộc và dược liệu thiên nhiên, 
          được tuyển chọn kỹ lưỡng từ các vùng nguyên liệu chất lượng cao
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-amber-50">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 space-y-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-green-600 text-white">
                  {product.category}
                </Badge>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>

              {product.benefits && product.benefits.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1">
                  {product.benefits.slice(0, 2).map((benefit, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="text-green-600">
                  {product.price.toLocaleString('vi-VN')}₫
                </div>
                {product.isFeatured && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                    Nổi bật
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Đặt Hàng
                </Button>
                <Button variant="outline" size="icon" className="border-green-600 text-green-600 hover:bg-green-50">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showViewAll && onViewAll && (
        <div className="text-center pt-8">
          <Button
            onClick={onViewAll}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            Xem Tất Cả Sản Phẩm
          </Button>
        </div>
      )}
    </div>
  );
}
