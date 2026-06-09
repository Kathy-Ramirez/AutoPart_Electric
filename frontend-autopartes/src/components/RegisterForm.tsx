import { useState } from 'react';
import { Eye, EyeOff, Mail, Phone, Lock } from 'lucide-react';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombres: '', apellidos: '', telefono: '', correo: '', username: '', password: '', confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState<'Débil' | 'Regular' | 'Fuerte' | ''>('');

  const handlePasswordChange = (val: string) => {
    setFormData({ ...formData, password: val });
    if (!val) setStrength('');
    else if (val.length < 8) setStrength('Débil');
    else if (/[A-Z]/.test(val) && /[0-9]/.test(val) && /[!@#$%^&*]/.test(val)) setStrength('Fuerte');
    else setStrength('Regular');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-900 to-gray-900">
      <div className="w-full max-w-lg p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Registro de Cliente</h2>
        
        <form className="space-y-4 text-white">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Nombres" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" onChange={(e) => setFormData({...formData, nombres: e.target.value})} />
            <input placeholder="Apellidos" className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" onChange={(e) => setFormData({...formData, apellidos: e.target.value})} />
          </div>
          
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-white/50" size={18} />
            <input placeholder="Teléfono" className="w-full pl-10 p-3 bg-white/5 border border-white/10 rounded-xl outline-none" onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/50" size={18} />
            <input type="email" placeholder="Correo electrónico" className="w-full pl-10 p-3 bg-white/5 border border-white/10 rounded-xl outline-none" onChange={(e) => setFormData({...formData, correo: e.target.value})} />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/50" size={18} />
            <input type={showPass ? "text" : "password"} placeholder="Contraseña" className="w-full pl-10 p-3 bg-white/5 border border-white/10 rounded-xl outline-none" onChange={(e) => handlePasswordChange(e.target.value)} />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-white/50">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <PasswordStrengthIndicator strength={strength} />

          <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 transition-all rounded-xl font-bold mt-4 shadow-lg shadow-blue-900/50">
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
};