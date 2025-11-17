import { useState } from 'react';
import { Plus, Trash2, FileSpreadsheet, DollarSign, TrendingDown, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import * as XLSX from 'xlsx';

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

export function ExpenseManagement() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      category: 'Tiền thuê mặt bằng',
      amount: 15000000,
      description: 'Tiền thuê cửa hàng tháng 11',
      date: new Date('2024-11-01'),
    },
    {
      id: '2',
      category: 'Lương nhân viên',
      amount: 20000000,
      description: 'Lương tháng 11 cho 4 nhân viên',
      date: new Date('2024-11-05'),
    },
    {
      id: '3',
      category: 'Tiền điện nước',
      amount: 2000000,
      description: 'Hóa đơn điện nước tháng 11',
      date: new Date('2024-11-10'),
    },
    {
      id: '4',
      category: 'Marketing',
      amount: 5000000,
      description: 'Chi phí quảng cáo Facebook, Google',
      date: new Date('2024-11-12'),
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: 0,
    description: '',
  });

  const categories = [
    'Tiền thuê mặt bằng',
    'Lương nhân viên',
    'Tiền điện nước',
    'Marketing',
    'Vận chuyển',
    'Bảo trì sửa chữa',
    'Văn phòng phẩm',
    'Chi phí khác',
  ];

  const handleSubmit = () => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      category: formData.category,
      amount: formData.amount,
      description: formData.description,
      date: new Date(),
    };

    setExpenses([newExpense, ...expenses]);
    setIsDialogOpen(false);
    setFormData({ category: '', amount: 0, description: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa chi phí này?')) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const exportToExcel = () => {
    const exportData = expenses.map(e => ({
      'Ngày': e.date.toLocaleDateString('vi-VN'),
      'Danh mục': e.category,
      'Số tiền': e.amount,
      'Mô tả': e.description,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Chi phí');
    XLSX.writeFile(wb, 'chi-phi-moc-an.xlsx');
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const thisMonthExpenses = expenses
    .filter(e => e.date.getMonth() === new Date().getMonth())
    .reduce((sum, e) => sum + e.amount, 0);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Quản Lý Chi Phí</h1>
          <p className="text-sm sm:text-base lg:text-base text-gray-600">Theo dõi và quản lý các khoản chi tiêu</p>
        </div>
        <div className="flex lg:flex-col sm:flex-row gap-2 sm:w-auto">
          <Button onClick={exportToExcel} variant="outline" className="border-green-600 text-green-600 text-sm sm:text-base sm:w-auto">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-green-600 hover:bg-green-700 text-sm sm:text-base sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Thêm Chi Phí
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-red-100 rounded-lg">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-1">
            {(totalExpenses / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs sm:text-sm lg:text-sm text-gray-500">Tổng Chi Phí</div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-1">
            {(thisMonthExpenses / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs sm:text-sm lg:text-sm text-gray-500">Chi Phí Tháng Này</div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
              <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-1">
            {Object.keys(expensesByCategory).length}
          </div>
          <div className="text-xs sm:text-sm lg:text-sm text-gray-500">Danh Mục</div>
        </div>
      </div>

      {/* Expenses by Category */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Chi Phí Theo Danh Mục</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
          {Object.entries(expensesByCategory).map(([category, amount]) => (
            <div key={category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="text-gray-900">{category}</div>
              <div className="text-red-600">{(amount / 1000000).toFixed(1)}M</div>
            </div>
          ))}
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Ngày</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Danh Mục</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Số Tiền</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Mô Tả</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs sm:text-sm lg:text-sm font-semibold text-gray-900">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-sm text-gray-600">
                  {expense.date.toLocaleDateString('vi-VN')}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-sm text-gray-900">{expense.category}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-sm text-red-600">
                  -{expense.amount.toLocaleString('vi-VN')}₫
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-sm text-gray-600">{expense.description}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(expense.id)}
                    className="text-red-600 hover:bg-red-50 h-8 w-8 sm:h-9 sm:w-9 p-0"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm Chi Phí Mới</DialogTitle>
            <DialogDescription>
              Thêm khoản chi phí mới vào hệ thống quản lý
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Danh Mục</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Số Tiền (VNĐ)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô Tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Nhập mô tả chi tiết..."
                rows={3}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Chi Phí
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}