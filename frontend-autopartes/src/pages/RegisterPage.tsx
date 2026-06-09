import { useState } from 'react';
import { UserPlus, User, Mail, Lock, Phone, BadgeInfo, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { registerRequest } from '../api/auth.api';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    correo: '',
    password: '',
    confirmPassword: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    id_rol: 2,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState<any>({});


  const validarCampo = ( name:string, value:string, ) => {
    let error = '';
    switch(name){

      case 'username':
        if(!/^[a-zA-Z0-9_]{4,20}$/.test(value))
          error = '4-20 caracteres. Solo letras, números y _';
      break;

      case 'correo':
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error='Correo inválido';
      break;

      // CORRECCIÓN: Validaciones estrictas si se pega contenido inválido
      case 'nombres':
        if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value) && value !== '')
          error='Solo se permiten letras y espacios';
      break;

      case 'apellidos':
        if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value) && value !== '')
          error='Solo se permiten letras y espacios';
      break;

      case 'telefono':
        if(!/^[0-9]{7,10}$/.test(value) && value !== '')
          error='Debe tener entre 7 a 10 dígitos numéricos';
      break;

      case 'password':
        if(value.length < 8)
          error='Mínimo 8 caracteres';
      break;

      case 'confirmPassword':
        if(value !== form.password)
          error='Las contraseñas no coinciden';
      break;
    }
    setErrores((prev:any)=>({ ...prev, [name]:error, }));
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;
    
    // CONTROL DE ENTRADA EN TIEMPO REAL (Filtra la inserción por teclado/portapapeles)
    if (name === 'telefono') {
      // Reemplaza instantáneamente cualquier carácter que no sea un número del 0 al 9
      const valorLimpio = value.replace(/[^0-9]/g, '');
      setForm({...form, [name]: valorLimpio});
      validarCampo(name, valorLimpio);
      return;
    }

    if (name === 'nombres' || name === 'apellidos') {
      // Reemplaza instantáneamente números y símbolos especiales, permitiendo letras de la A-Z, acentos y espacios
      const valorLimpio = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ ]/g, '');
      setForm({...form, [name]: valorLimpio});
      validarCampo(name, valorLimpio);
      return;
    }

    setForm({...form, [name]:value, });
    validarCampo(name,value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificación final de que no existan errores pendientes en el objeto
    const tieneErrores = Object.values(errores).some((err) => err !== '');
    if (tieneErrores) {
      alert("Por favor, corrige los campos marcados en rojo antes de continuar.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      await registerRequest(form);
      alert("Cuenta creada correctamente");

      setForm({
        username: '',
        correo: '',
        password: '',
        confirmPassword: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        id_rol: 2,
      });
    } catch (error) {
      console.log(error);
      alert("Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  const obtenerNivelPassword = (password: string) => {
    let nivel = 0;
    if (password.length >= 8) nivel++;
    if (/[A-Z]/.test(password)) nivel++;
    if (/[0-9]/.test(password)) nivel++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) nivel++;

    if (password.length === 0) {
      return { texto: 'Vacía', ancho: '0%', color: 'bg-slate-800' };
    }
    if (nivel <= 1) {
      return { texto: 'Débil', ancho: '33%', color: 'bg-red-500' };
    }
    if (nivel <= 3) {
      return { texto: 'Media', ancho: '66%', color: 'bg-gradient-to-r from-amber-500 to-yellow-400' };
    }
    return { texto: 'Fuerte', ancho: '100%', color: 'bg-gradient-to-r from-emerald-500 to-green-400' };
  };

  const seguridad = obtenerNivelPassword(form.password);

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-4 md:p-10 relative overflow-hidden font-sans">
      
      {/* DEGRADADOS NEÓN DE FONDO (Efecto Eléctrico Premium) */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-full max-w-5xl grid md:grid-cols-12 rounded-[36px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-2xl shadow-2xl z-10">
        
        {/* PANEL IZQUIERDO: DE CARÁCTER COMERCIAL / CLIENTE (4 Columnas) */}
        <div className="hidden md:flex md:col-span-5 flex-col justify-between bg-gradient-to-b from-blue-950/40 via-slate-900/20 to-transparent p-10 border-r border-white/5">
          <div className="space-y-3">
            <div className="text-3xl font-black tracking-wider text-white">
              <span className="text-blue-500">⚡</span> AutoPart<span className="text-blue-400">Electric</span>
            </div>
            <p className="text-slate-400 text-base leading-relaxed">
              Únete a nuestra plataforma exclusiva para clientes. Consulta existencias de piezas originales en tiempo real y protege el sistema eléctrico de tu vehículo.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 group bg-slate-950/40 p-2">
            <img
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600"
              alt="Autopart Premium"
              className="rounded-xl object-cover w-full h-56 opacity-50 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent rounded-xl" />
            <span className="absolute bottom-5 left-5 text-xs text-blue-400 font-semibold uppercase tracking-wider bg-blue-950/80 border border-blue-500/30 px-3 py-1 rounded-full backdrop-blur-md">
              Originales Certificados
            </span>
          </div>
        </div>

        {/* FORMULARIO DE REGISTRO (7 Columnas) */}
        <form onSubmit={handleSubmit} className="md:col-span-7 p-8 md:p-10 space-y-5 bg-slate-950/30">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-400">
              <UserPlus size={24} />
              <h2 className="text-3xl font-black tracking-tight text-white">Crear Cuenta</h2>
            </div>
            <p className="text-sm text-slate-400">Completa tus datos personales para acceder al catálogo.</p>
          </div>

          {/* INPUTS PRINCIPALES */}
          <div className="space-y-4">
            <div>
              <Input
                icon={<User size={18} />}
                placeholder="Elige un nombre de usuario"
                name="username" value={form.username} onChange={handleChange} />
              {errores.username && (
                <p className="text-red-400 text-xs mt-1">{errores.username}</p>
              )}
            </div>

            <div>
              <Input 
                icon = {<Mail size={18}/> }
                placeholder="Correo electrónico" 
                name="correo" 
                value={form.correo} 
                onChange={handleChange} />
              {errores.correo && (
                <p className="text-red-400 text-xs mt-1"> {errores.correo} </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  icon={<BadgeInfo size={18} />}
                  placeholder="Nombres"
                  name = "nombres"
                  value={form.nombres}
                  onChange={handleChange} />
                {errores.nombres && (
                  <p className="text-red-400 text-xs mt-1">{errores.nombres} </p>
                )}
              </div>

              <div>
                <Input
                  icon={<BadgeInfo size={18} />}
                  placeholder="Apellidos"
                  value={form.apellidos}
                  name = "apellidos"
                  onChange = {handleChange}/>
                {errores.apellidos && (
                  <p className='text-red-400 text-xs mt-1'>{errores.apellidos}</p>
                )}
              </div>
            </div>

            <div>
              <Input
                icon={<Phone size={18} />}
                placeholder="Número de teléfono / Celular"
                type="text"
                value={form.telefono}
                name = "telefono"
                onChange = {handleChange}/>
              {errores.telefono && (
                <p className='text-red-400 text-xs mt-1'>{errores.telefono}</p>
              )}
            </div>
            

            {/* CONTRASEÑA CON DISEÑO UNIFICADO */}
            <div className="space-y-2">
              <label className="text-slate-300 text-sm font-medium block">Contraseña de acceso</label>
              <div className="flex items-center gap-3 bg-slate-950/50 rounded-xl px-4 py-3.5 border border-white/5 focus-within:border-blue-500/40 focus-within:bg-slate-950/80 transition-all relative group">
                <Lock size={18} className="text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    validarCampo('password', e.target.value);
                    if(form.confirmPassword) validarCampo('confirmPassword', form.confirmPassword);
                  }}
                  className="bg-transparent outline-none text-white w-full pr-10 text-sm md:text-base placeholder:text-slate-600"
                  placeholder="Mínimo 8 caracteres"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* MEDIDOR DE SEGURIDAD ELÉCTRICO */}
              {form.password && (
                <div className="space-y-1 pt-1 animate-fadeIn">
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-white/5">
                    <div
                      className={`h-full transition-all duration-500 ${seguridad.color}`}
                      style={{ width: seguridad.ancho }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Nivel de protección: <span className="font-bold text-slate-300">{seguridad.texto}</span>
                  </p>
                </div>
              )}
            </div>

            {/* CONFIRMAR CONTRASEÑA */}
            <div className="space-y-2">
              <label className="text-slate-300 text-sm font-medium block">Confirma tu contraseña</label>
              <div className="flex items-center gap-3 bg-slate-950/50 rounded-xl px-4 py-3.5 border border-white/5 focus-within:border-blue-500/40 focus-within:bg-slate-950/80 transition-all relative group">
                <Lock size={18} className="text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) => {
                    setForm({ ...form, confirmPassword: e.target.value });
                    validarCampo('confirmPassword', e.target.value);
                  }}
                  className="bg-transparent outline-none text-white w-full pr-10 text-sm md:text-base placeholder:text-slate-600"
                  placeholder="Repite la contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* BOTÓN Y LOGIN REDIRECT */}
          <div className="space-y-4 pt-2">
            <button 
              disabled={loading}
              className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 rounded-xl p-4 text-white font-bold transition-all duration-300 shadow-xl shadow-blue-500/10 hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? "Registrando usuario..." : "Registrarme Ahora"}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
            </button>

            <div className="flex justify-center items-center text-sm border-t border-white/5 pt-4">
              <span className="text-slate-500">¿Ya tienes cuenta?</span>
              <Link to="/login" className="ml-2 text-blue-400 font-bold hover:text-blue-300 hover:underline transition-colors">
                Iniciar sesión
              </Link>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

function Input({ icon, ...props }: any) {
  return (
    <div className="flex items-center gap-3 bg-slate-950/50 rounded-xl px-4 py-3.5 border border-white/5 focus-within:border-blue-500/40 focus-within:bg-slate-950/80 transition-all relative group">
      <div className="text-slate-500 group-focus-within:text-blue-400 transition-colors">{icon}</div>
      <input 
        className="bg-transparent outline-none text-white w-full placeholder:text-slate-600 text-sm md:text-base" 
        required
        {...props} 
      />
    </div>
  );
}