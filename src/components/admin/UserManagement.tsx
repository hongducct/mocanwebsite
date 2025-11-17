import { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, Search, FileSpreadsheet, CheckCircle, XCircle } from 'lucide-react';
import { User } from '../../App';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import * as XLSX from 'xlsx';

interface UserManagementProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

export function UserManagement({ users, setUsers }: UserManagementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'Member',
    status: 'active',
  });

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'Member',
        status: 'active',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...formData, id: u.id, createdAt: u.createdAt } as User : u)));
    } else {
      const newUser: User = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date(),
      } as User;
      setUsers([...users, newUser]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const exportToExcel = () => {
    const exportData = users.map(u => ({
      'Họ tên': u.name,
      'Email': u.email,
      'Vai trò': u.role,
      'Trạng thái': u.status === 'active' ? 'Hoạt động' : 'Không hoạt động',
      'Ngày tạo': u.createdAt.toLocaleDateString('vi-VN'),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Người dùng');
    XLSX.writeFile(wb, 'nguoi-dung-moc-an.xlsx');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-700';
      case 'Team Leader':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Quản Lý Người Dùng</h1>
          <p className="text-sm sm:text-base text-gray-600">Quản lý thông tin và phân quyền người dùng</p>
        </div>
        <div className="flex lg:flex-col sm:flex-row gap-2 sm:w-auto">
          <Button onClick={exportToExcel} variant="outline" className="border-green-600 text-green-600 text-sm sm:text-base sm:w-auto">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
          <Button onClick={() => handleOpenDialog()} className="bg-green-600 hover:bg-green-700 text-sm sm:text-base sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Thêm Người Dùng
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo tên hoặc email..."
            className="pl-10 sm:pl-10 text-sm"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Người Dùng</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Email</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Vai Trò</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Ngày Tạo</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Trạng Thái</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-gray-900">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm text-green-600 font-medium">{user.name.charAt(0)}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user.name}</div>
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 break-all">{user.email}</td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <Badge className={`${getRoleBadgeColor(user.role)} text-xs`}>{user.role}</Badge>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">
                  {user.createdAt.toLocaleDateString('vi-VN')}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  {user.status === 'active' ? (
                    <div className="flex items-center gap-1.5 sm:gap-2 text-green-600">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Hoạt động</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 sm:gap-2 text-red-600">
                      <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Không hoạt động</span>
                    </div>
                  )}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenDialog(user)} className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                      <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:bg-red-50 h-8 w-8 sm:h-9 sm:w-9 p-0"
                    >
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Chỉnh Sửa Người Dùng' : 'Thêm Người Dùng Mới'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Cập nhật thông tin và phân quyền người dùng' : 'Thêm người dùng mới vào hệ thống'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Họ và Tên</Label>
              <Input
                id="userName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userRole">Vai Trò</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as User['role'] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Team Leader">Team Leader</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userStatus">Trạng Thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as User['status'] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                {editingUser ? 'Cập Nhật' : 'Thêm Người Dùng'}
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
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