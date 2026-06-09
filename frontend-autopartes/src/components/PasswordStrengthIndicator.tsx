// import React from 'react';

interface Props {
  strength: 'Débil' | 'Regular' | 'Fuerte' | '';
}

export const PasswordStrengthIndicator = ({ strength }: Props) => {
  if (!strength) return null;

  // Cambiar colores dinámicamente según la seguridad
  const colorClass = 
    strength === 'Débil' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
    strength === 'Regular' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' : 
    'text-green-400 bg-green-500/10 border-green-500/20';

  return (
    <div className={`p-2 rounded-xl border text-xs font-semibold ${colorClass} transition-all`}>
      Nivel de seguridad de contraseña: <span className="underline uppercase">{strength}</span>
    </div>
  );
};