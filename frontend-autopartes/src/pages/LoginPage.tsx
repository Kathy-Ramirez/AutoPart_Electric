import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { loginRequest, solicitarRecuperacion, restablecerPassword } from '../api/auth.api';
import { Eye, EyeOff, User, Lock, KeyRound, Loader2, ArrowRight, Mail, ShieldAlert, ChevronLeft } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Estados de Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Estados de Recuperación de Contraseña
  const [showRecovery, setShowRecovery] = useState(false);
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setError( 'Completa el captcha');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const response = await loginRequest({ username, password, captchaToken: captchaToken!,});
      login(response);
      if (response.usuario.rol === 'ADMINISTRADOR') {
        navigate('/admin');
      } else {
        navigate('/cliente');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const enviarCodigo = async () => {
    if (!correo) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }
    try {
      setLoading(true);
      await solicitarRecuperacion(correo);
      alert('Código enviado al correo correctamente.');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error al enviar el código');
    } finally {
      setLoading(false);
    }
  };

  const cambiarPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevaPassword !== confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      setLoading(true);
      await restablecerPassword({
        correo,
        codigo,
        nuevaPassword,
        confirmarPassword,
      });
      alert('Contraseña actualizada con éxito');
      setShowRecovery(false);
      // Limpiar campos
      setCodigo('');
      setNuevaPassword('');
      setConfirmarPassword('');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error al restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  // LÓGICA DE SEGURIDAD DE CONTRASEÑA UNIFICADA
  const obtenerNivelPassword = (pass: string) => {
    let nivel = 0;
    if (pass.length >= 8) nivel++;
    if (/[A-Z]/.test(pass)) nivel++;
    if (/[0-9]/.test(pass)) nivel++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) nivel++;

    if (pass.length === 0) {
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

  const seguridad = obtenerNivelPassword(nuevaPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden p-4 font-sans">
      
      {/* DEGRADADOS NEÓN DE AMBIENTACIÓN */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* CONDICIONAL: FORMULARIO DE RECUPERACIÓN */}
      {showRecovery ? (
        <div className="relative w-full max-w-[440px] bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl z-10 space-y-6 animate-fadeIn">
          
          {/* Encabezado Recuperación */}
          <div className="text-center space-y-2">
            <button 
              type="button" 
              onClick={() => setShowRecovery(false)}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mb-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
            >
              <ChevronLeft size={14} /> Volver al Login
            </button>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto shadow-lg">
              <ShieldAlert size={22} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Recuperar Contraseña</h2>
            <p className="text-xs text-slate-400">Sigue los pasos para restablecer tus credenciales</p>
          </div>

          {/* Formulario Interno de Recuperación */}
          <div className="space-y-4">
            {/* Paso 1: Correo y botón de código */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-medium">1. Solicitar código de verificación</label>
              <div className="flex gap-2">
                <div className="relative flex-1 group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                    <Mail size={16} />
                  </span>
                  <input 
                    type="email"
                    placeholder="Tu correo registrado" 
                    value={correo} 
                    onChange={(e) => setCorreo(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/50 text-white outline-none border border-white/5 focus:border-cyan-500/40 text-sm placeholder-slate-600"
                  />
                </div>
                <button
                  type="button"
                  onClick={enviarCodigo}
                  disabled={loading}
                  className="bg-cyan-600 hover:bg-cyan-500 transition px-3 rounded-xl text-xs font-bold text-white whitespace-nowrap disabled:opacity-50"
                >
                  Enviar
                </button>
              </div>
            </div>

            <div className="border-t border-white/5 my-2 pt-2" />

            {/* Paso 2: Cambiar Contraseña */}
            <form onSubmit={cambiarPassword} className="space-y-3">
              <label className="text-xs text-slate-400 font-medium block">2. Ingresar nueva información</label>
              
              <input 
                type="text"
                placeholder="Código recibido" 
                value={codigo} 
                onChange={(e) => setCodigo(e.target.value)} 
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950/50 text-white outline-none border border-white/5 focus:border-blue-500/40 text-sm placeholder-slate-600"
              />

              {/* Input Nueva Contraseña con Ojito */}
              <div className="relative group">
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  placeholder="Nueva contraseña" 
                  value={nuevaPassword} 
                  onChange={(e) => setNuevaPassword(e.target.value)} 
                  required
                  className="w-full px-4 pr-10 py-3 rounded-xl bg-slate-950/50 text-white outline-none border border-white/5 focus:border-blue-500/40 text-sm placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* BARRA DE SEGURIDAD ELÉCTRICA (Copiada del Registro) */}
              {nuevaPassword && (
                <div className="space-y-1 pt-0.5 pb-1 animate-fadeIn">
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-white/5">
                    <div
                      className={`h-full transition-all duration-500 ${seguridad.color}`}
                      style={{ width: seguridad.ancho }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Nivel de protección: <span className="font-bold text-slate-300">{seguridad.texto}</span>
                  </p>
                </div>
              )}

            {/* Confirmar Nueva Contraseña con Ojito */}
            <div className="relative group">
              <input 
                type={showNewPassword ? "text" : "password"} 
                placeholder="Confirmar nueva contraseña" 
                value={confirmarPassword} 
                onChange={(e) => setConfirmarPassword(e.target.value)} 
                required
                className="w-full px-4 pr-10 py-3 rounded-xl bg-slate-950/50 text-white outline-none border border-white/5 focus:border-blue-500/40 text-sm placeholder-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            </form>
          </div>

        </div>
      ) : (
        /* VISTA ORIGINAL: FORMULARIO DE LOGIN GENERAL */
        <form 
          onSubmit={handleSubmit} 
          className="relative w-full max-w-[440px] bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl z-10 space-y-6 animate-fadeIn"
        >
          {/* LOGO E ICONO */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-2 shadow-lg shadow-blue-500/5">
              <KeyRound size={22} />
            </div>
            <h1 className="text-3xl md:text-4xl text-white font-black tracking-tight">
              AutoPart<span className="text-blue-400">Electric</span>
            </h1>
            <p className="text-sm text-slate-400">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* CONTENEDORES DE INPUTS */}
          <div className="space-y-4">
            
            {/* Input Usuario */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                <User size={18} />
              </span>
              <input 
                type="text"
                placeholder="Nombre de usuario" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/50 text-white outline-none border border-white/5 focus:border-blue-500/40 focus:bg-slate-950/80 transition-all text-sm md:text-base placeholder-slate-600"
              />
            </div>

            {/* Input Contraseña + Ojito */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                <Lock size={18} />
              </span>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-slate-950/50 text-white outline-none border border-white/5 focus:border-blue-500/40 focus:bg-slate-950/80 transition-all text-sm md:text-base placeholder-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

          </div>

          {/* MANEJO DE ERRORES */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}


          <div className="flex justify-center pt-2">
            <ReCAPTCHA sitekey={ import.meta.env .VITE_RECAPTCHA_SITE_KEY } theme="dark" onChange={(token)=> setCaptchaToken(token) } />
          </div>


          {/* BOTÓN DE ENTRADA */}
          <div className="space-y-4 pt-2">
            <button 
              disabled={loading} 
              className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 rounded-xl p-4 text-white font-bold transition-all duration-300 shadow-xl shadow-blue-500/10 disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Validando datos...
                </>
              ) : (
                <>
                  Ingresar al Sistema
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>

            {/* REDIRECCIÓN Y RECUPERACIÓN */}
            <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-slate-500">¿No tienes cuenta?</span>
                <Link 
                  to="/registro" 
                  className="text-blue-400 font-semibold hover:text-blue-300 hover:underline transition-colors"
                >
                  Crear una cuenta
                </Link> 
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowRecovery(true)}
                  className="text-slate-400 hover:text-blue-400 text-xs transition-colors hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>
          </div>

        </form>
      )}
    </div>
  );
}