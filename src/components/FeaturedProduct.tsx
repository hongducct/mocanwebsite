import { Check, Star, Gift } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface FeaturedProductProps {
  product: Product;
}

export function FeaturedProduct({ product }: FeaturedProductProps) {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-green-600 to-emerald-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image section */}
            <div className="relative bg-gradient-to-br from-amber-50 to-green-50 p-6 sm:p-8 lg:p-12 flex items-center justify-center order-2 lg:order-1">
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
                <Badge className="bg-red-500 text-white text-xs sm:text-sm">
                  <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Sản Phẩm Đặc Biệt
                </Badge>
              </div>
              <div className="relative w-full max-w-sm lg:max-w-md">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-xl sm:rounded-2xl shadow-xl"
                />
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-amber-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full rotate-12 shadow-lg">
                  <div className="text-center">
                    <div className="text-xs sm:text-sm">Chỉ</div>
                    <div className="text-lg sm:text-xl font-bold">{(product.price / 1000).toFixed(0)}K</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
              <div className="inline-flex items-center gap-1 mb-3 sm:mb-4 flex-wrap">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-xs sm:text-sm text-gray-600">(128 đánh giá)</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-900 mb-3 sm:mb-4">{product.name}</h2>
              
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {product.description}
              </p>

              <div className="mb-6 sm:mb-8">
                <div className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Công Dụng Nổi Bật:</div>
                <div className="space-y-1.5 sm:space-y-2">
                  {product.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="p-1 bg-green-100 rounded-full mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <div className="text-xs sm:text-sm text-gray-500">Giá đặc biệt</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                    {product.price.toLocaleString('vi-VN')}₫
                  </div>
                </div>
                <div className="text-sm sm:text-base text-gray-400 line-through">150.000₫</div>
                <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs sm:text-sm">
                  Tiết kiệm 50K
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-sm sm:text-base">
                  Đặt Hàng Ngay
                </Button>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 text-sm sm:text-base">
                  Tìm Hiểu Thêm
                </Button>
              </div>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start gap-2">
                  <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-amber-900">Ưu đãi đặc biệt</div>
                    <div className="text-xs sm:text-sm text-amber-700">Mua 2 tặng 1 gói trà hoa cúc trị giá 45K</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
