import api from './api';

export const authService = {
  async cadastrar(dados) {
    const response = await api.post('/usuario/cadastrar', dados);
    return response.data;
  },

  async login(dados) {
    const response = await api.post('/usuario/login', dados);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },

  getUsuario() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
};
