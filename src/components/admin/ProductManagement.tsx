import { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, FileSpreadsheet } from 'lucide-react';
import { Product } from '../../App';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Badge } from '../ui/badge';
import * as XLSX from 'xlsx';

interface ProductManagementProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export function ProductManagement({ products, setProducts }: ProductManagementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    cost: 0,
    stock: 0,
    category: '',
    image: '',
    benefits: [],
    isFeatured: false,
  });

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        cost: 0,
        stock: 0,
        category: '',
        image: 'https://images.unsplash.com/photo-1707915317391-2d9e56a93541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBoZXJic3xlbnwxfHx8fDE3NjMzNDYzODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        benefits: [],
        isFeatured: false,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...formData, id: p.id } as Product : p)));
    } else {
      const newProduct: Product = { ...formData, id: Date.now().toString() } as Product;
      setProducts([...products, newProduct]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleBenefitsChange = (value: string) => {
    const benefits = value.split('\n').filter(b => b.trim());
    setFormData({ ...formData, benefits });
  };

  const exportToExcel = () => {
    const exportData = products.map(p => ({
      'Tên sản phẩm': p.name,
      'Danh mục': p.category,
      'Giá bán': p.price,
      'Giá vốn': p.cost || 0,
      'Tồn kho': p.stock || 0,
      'Lợi nhuận': (p.price - (p.cost || 0)),
      'Mô tả': p.description,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sản phẩm');
    XLSX.writeFile(wb, 'san-pham-moc-an.xlsx');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Quản Lý Sản Phẩm</h1>
          <p className="text-sm sm:text-base text-gray-600">Thêm, sửa, xóa sản phẩm của cửa hàng</p>
        </div>
        <div className="flex lg:flex-col sm:flex-row gap-2 sm:w-auto">
          <Button onClick={exportToExcel} variant="outline" className="border-green-600 text-green-600 text-sm sm:text-base sm:w-auto">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
          <Button onClick={() => handleOpenDialog()} className="bg-green-600 hover:bg-green-700 text-sm sm:text-base sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Thêm Sản Phẩm
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Sản Phẩm</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Danh Mục</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Giá Bán</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Giá Vốn</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Tồn Kho</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Trạng Thái</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-gray-900">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{product.name}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500 line-clamp-1">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">{product.price.toLocaleString('vi-VN')}₫</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">{(product.cost || 0).toLocaleString('vi-VN')}₫</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <span className={`text-xs sm:text-sm font-medium ${(product.stock || 0) < 30 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stock || 0}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  {product.isFeatured && <Badge className="bg-amber-100 text-amber-700 text-xs">Nổi bật</Badge>}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenDialog(product)} className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                      <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)} className="text-red-600 hover:bg-red-50 h-8 w-8 sm:h-9 sm:w-9 p-0">
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">{editingProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</DialogTitle>
            <DialogDescription className="text-sm">
              {editingProduct ? 'Cập nhật thông tin sản phẩm' : 'Nhập thông tin sản phẩm mới'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 sm:space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="name" className="text-sm">Tên Sản Phẩm</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="VD: Trà Hoa Cúc" className="text-sm" />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="category" className="text-sm">Danh Mục</Label>
                <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="VD: Trà Thảo Mộc" className="text-sm" />
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="description" className="text-sm">Mô Tả</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Mô tả chi tiết về sản phẩm" rows={3} className="text-sm resize-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="price" className="text-sm">Giá Bán (VNĐ)</Label>
                <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} placeholder="50000" className="text-sm" />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="cost" className="text-sm">Giá Vốn (VNĐ)</Label>
                <Input id="cost" type="number" value={formData.cost} onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })} placeholder="30000" className="text-sm" />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="stock" className="text-sm">Tồn Kho</Label>
                <Input id="stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} placeholder="100" className="text-sm" />
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="image" className="text-sm">URL Hình Ảnh</Label>
              <Input id="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." className="text-sm" />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="benefits" className="text-sm">Công Dụng (mỗi dòng một công dụng)</Label>
              <Textarea id="benefits" value={formData.benefits?.join('\n') || ''} onChange={(e) => handleBenefitsChange(e.target.value)} placeholder="Thanh nhiệt giải độc&#10;Tăng cường sức đề kháng" rows={4} className="text-sm resize-none" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-4 h-4 text-green-600" />
              <Label htmlFor="isFeatured" className="text-sm">Đánh dấu là sản phẩm nổi bật</Label>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-2 sm:pt-4">
              <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700 text-sm sm:text-base">
                <Save className="w-4 h-4 mr-2" />
                {editingProduct ? 'Cập Nhật' : 'Thêm Sản Phẩm'}
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1 text-sm sm:text-base">
                <X className="w-4 h-4 mr-2" />
                Hủy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}