import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioSalvo = authService.getUsuario();
    if (usuarioSalvo) {
      setUsuario(usuarioSalvo);
    }
    setLoading(false);
  }, []);

  const login = async (dados) => {
    const response = await authService.login(dados);
    setUsuario(response.usuario);
    return response;
  };

  const cadastrar = async (dados) => {
    const response = await authService.cadastrar(dados);
    return response;
  };

  const logout = () => {
    authService.logout();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, cadastrar, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
