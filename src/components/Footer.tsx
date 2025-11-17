import { Leaf, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-900 to-emerald-800 text-white mt-12 sm:mt-16 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-semibold">MỘC AN</div>
                <div className="text-[10px] sm:text-xs text-green-200">Trà Thảo Mộc & Dược Liệu</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-green-100">
              Mang đến sức khỏe và hạnh phúc cho mọi gia đình Việt Nam 
              với những sản phẩm thiên nhiên chất lượng cao.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-green-100">
              <li>
                <a href="#" className="hover:text-white transition-colors block">Về Chúng Tôi</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors block">Sản Phẩm</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors block">Tin Tức</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors block">Liên Hệ</a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-green-100">
              <li>
                <a href="#" className="hover:text-white transition-colors block">Chính Sách Đổi Trả</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors block">Hướng Dẫn Mua Hàng</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors block">Câu Hỏi Thường Gặp</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors block">Chính Sách Bảo Mật</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Thông Tin Liên Hệ</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-green-100">
              <li className="flex items-start gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 sm:mt-1 flex-shrink-0" />
                <span className="break-words">Thôn An Tiên, Xuân Giang, Nghi Xuân, Hà Tĩnh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-all">0988 348 300 - 0799 076 901</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 sm:mt-1 flex-shrink-0" />
                <span className="break-all">info@mocan.hongducct.id.vn 
                  <br />
                  support@mocan.hongducct.id.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-green-100 text-center sm:text-left">
              © 2025 MỘC AN. Hồng Đức Technology Company Limited. All rights reserved.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="https://facebook.com/hongducct" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://instagram.com/hongducct" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://zalo.me/0988348300" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
