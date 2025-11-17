import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => boolean;
}

export function LoginDialog({ open, onClose, onLogin }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = onLogin(email, password);
    if (success) {
      setEmail('');
      setPassword('');
    } else {
      setError('Email hoặc mật khẩu không đúng!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="w-5 h-5 text-green-600" />
            Đăng Nhập
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin đăng nhập để truy cập hệ thống
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mocan.vn"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            <div className="mb-2">Tài khoản demo:</div>
            <div>Email: <strong>admin@mocan.vn</strong></div>
            <div>Mật khẩu: <strong>123456</strong></div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            <LogIn className="w-4 h-4 mr-2" />
            Đăng Nhập
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}