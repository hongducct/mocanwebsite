import { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Plus, FileSpreadsheet, Calendar } from 'lucide-react';
import { Product } from '../../App';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import * as XLSX from 'xlsx';

interface InventoryTransaction {
  id: string;
  productId: string;
  productName: string;
  type: 'import' | 'export';
  quantity: number;
  price: number;
  note: string;
  date: Date;
}

interface InventoryManagementProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export function InventoryManagement({ products, setProducts }: InventoryManagementProps) {
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([
    {
      id: '1',
      productId: '1',
      productName: 'Hộp Set Trà Ngũ Vị',
      type: 'import',
      quantity: 50,
      price: 60000,
      note: 'Nhập hàng từ nhà cung cấp ABC',
      date: new Date('2024-11-10'),
    },
    {
      id: '2',
      productId: '2',
      productName: 'Trà Hoa Cúc',
      type: 'export',
      quantity: 20,
      price: 45000,
      note: 'Bán cho khách hàng lẻ',
      date: new Date('2024-11-15'),
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    productId: '',
    type: 'import' as 'import' | 'export',
    quantity: 0,
    price: 0,
    note: '',
  });

  const handleSubmit = () => {
    const product = products.find(p => p.id === formData.productId);
    if (!product) return;

    const newTransaction: InventoryTransaction = {
      id: Date.now().toString(),
      productId: formData.productId,
      productName: product.name,
      type: formData.type,
      quantity: formData.quantity,
      price: formData.price,
      note: formData.note,
      date: new Date(),
    };

    setTransactions([newTransaction, ...transactions]);

    // Update product stock
    const updatedProducts = products.map(p => {
      if (p.id === formData.productId) {
        const newStock = formData.type === 'import' 
          ? (p.stock || 0) + formData.quantity
          : (p.stock || 0) - formData.quantity;
        return { ...p, stock: Math.max(0, newStock) };
      }
      return p;
    });
    setProducts(updatedProducts);

    setIsDialogOpen(false);
    setFormData({ productId: '', type: 'import', quantity: 0, price: 0, note: '' });
  };

  const exportToExcel = () => {
    const exportData = transactions.map(t => ({
      'Ngày': t.date.toLocaleDateString('vi-VN'),
      'Sản phẩm': t.productName,
      'Loại': t.type === 'import' ? 'Nhập hàng' : 'Xuất hàng',
      'Số lượng': t.quantity,
      'Đơn giá': t.price,
      'Thành tiền': t.quantity * t.price,
      'Ghi chú': t.note,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Nhập xuất');
    XLSX.writeFile(wb, 'nhap-xuat-hang-moc-an.xlsx');
  };

  const totalImport = transactions
    .filter(t => t.type === 'import')
    .reduce((sum, t) => sum + (t.quantity * t.price), 0);

  const totalExport = transactions
    .filter(t => t.type === 'export')
    .reduce((sum, t) => sum + (t.quantity * t.price), 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Quản Lý Nhập/Xuất Hàng</h1>
          <p className="text-sm sm:text-base lg:text-base text-gray-600">Theo dõi và quản lý kho hàng</p>
        </div>
        <div className="flex lg:flex-col sm:flex-row gap-2 sm:w-auto">
          <Button onClick={exportToExcel} variant="outline" className="border-green-600 text-green-600 text-sm sm:text-base sm:w-auto">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-green-600 hover:bg-green-700 text-sm sm:text-base sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Thêm Giao Dịch
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
              <ArrowUpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-1">
            {(totalImport / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs sm:text-sm lg:text-sm text-gray-500">Tổng Nhập Hàng</div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-red-100 rounded-lg">
              <ArrowDownCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-1">
            {(totalExport / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs sm:text-sm lg:text-sm text-gray-500">Tổng Xuất Hàng</div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-1">
            {transactions.length}
          </div>
          <div className="text-xs sm:text-sm lg:text-sm text-gray-500">Tổng Giao Dịch</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Ngày</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Sản Phẩm</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Loại</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Số Lượng</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Đơn Giá</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Thành Tiền</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Ghi Chú</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-sm text-gray-600">
                  {transaction.date.toLocaleDateString('vi-VN')}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-sm text-gray-900">{transaction.productName}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  {transaction.type === 'import' ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <ArrowUpCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm lg:text-sm">Nhập hàng</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <ArrowDownCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm lg:text-sm">Xuất hàng</span>
                    </div>
                  )}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-sm text-gray-900">{transaction.quantity}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-sm text-gray-600">
                  {transaction.price.toLocaleString('vi-VN')}₫
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-sm text-gray-900">
                  {(transaction.quantity * transaction.price).toLocaleString('vi-VN')}₫
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-sm text-gray-600">{transaction.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm Giao Dịch Nhập/Xuất</DialogTitle>
            <DialogDescription>
              Thêm giao dịch nhập hoặc xuất hàng mới
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="product">Sản Phẩm</Label>
              <Select
                value={formData.productId}
                onValueChange={(value) => {
                  const product = products.find(p => p.id === value);
                  setFormData({ 
                    ...formData, 
                    productId: value,
                    price: product?.cost || product?.price || 0
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn sản phẩm" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} (Tồn: {product.stock || 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Loại Giao Dịch</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as 'import' | 'export' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="import">Nhập hàng</SelectItem>
                  <SelectItem value="export">Xuất hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Số Lượng</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transPrice">Đơn Giá</Label>
                <Input
                  id="transPrice"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Ghi Chú</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Nhập ghi chú..."
                rows={3}
              />
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-900">
                Thành tiền: <strong>{(formData.quantity * formData.price).toLocaleString('vi-VN')}₫</strong>
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Giao Dịch
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}