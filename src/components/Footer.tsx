import { Leaf, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-900 to-emerald-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl">MỘC AN</div>
                <div className="text-xs text-green-200">Trà Thảo Mộc & Dược Liệu</div>
              </div>
            </div>
            <p className="text-sm text-green-100">
              Mang đến sức khỏe và hạnh phúc cho mọi gia đình Việt Nam 
              với những sản phẩm thiên nhiên chất lượng cao.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">Về Chúng Tôi</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Sản Phẩm</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Tin Tức</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Liên Hệ</a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="mb-4">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">Chính Sách Đổi Trả</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Hướng Dẫn Mua Hàng</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Câu Hỏi Thường Gặp</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Chính Sách Bảo Mật</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Thông Tin Liên Hệ</h4>
            <ul className="space-y-3 text-sm text-green-100">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Đường Lê Lợi, Q.1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@mocan.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-green-100">
              © 2024 MỘC AN. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
