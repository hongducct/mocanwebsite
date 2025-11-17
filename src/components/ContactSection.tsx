import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-green-900 mb-3">Liên Hệ Với Chúng Tôi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. 
            Hãy liên hệ ngay để được tư vấn miễn phí!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-green-900 mb-6">Thông Tin Liên Hệ</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-gray-900">Địa Chỉ</div>
                    <p className="text-sm text-gray-600">
                      Thôn An Tiên, Xuân Giang, Nghi Xuân, Hà Tĩnh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-gray-900">Số Điện Thoại</div>
                    <p className="text-sm text-gray-600">0988 348 300</p>
                    <p className="text-sm text-gray-600">0799 076 901</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-gray-900">Email</div>
                    <p className="text-sm text-gray-600">info@mocan.hongducct.id.vn</p>
                    <p className="text-sm text-gray-600">support@mocan.hongducct.id.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-gray-900">Giờ Làm Việc</div>
                    <p className="text-sm text-gray-600">Thứ 2 - Thứ 7: 8:00 - 20:00</p>
                    <p className="text-sm text-gray-600">Chủ Nhật: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-6 rounded-2xl text-white">
              <h3 className="mb-4">Kết Nối Với Chúng Tôi</h3>
              <div className="flex gap-3">
                <button className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                  <Facebook className="w-6 h-6" />
                </button>
                <button className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                  <Instagram className="w-6 h-6" />
                </button>
                <button className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </button>
              </div>
              <p className="text-sm text-green-100 mt-4">
                Theo dõi chúng tôi trên mạng xã hội để cập nhật những tin tức và ưu đãi mới nhất!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h3 className="text-green-900 mb-6">Gửi Tin Nhắn</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và Tên *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số Điện Thoại *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0123 456 789"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Nội Dung *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Nhập nội dung bạn muốn trao đổi..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                <Send className="w-4 h-4 mr-2" />
                Gửi Tin Nhắn
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}