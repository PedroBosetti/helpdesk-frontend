import api from './api';

export const chamadosService = {
  async listarTodos() {
    const response = await api.get('/chamado/listar');
    return response.data.chamados;
  },

  async listarPorId(id) {
    const response = await api.get(`/chamado/listar/${id}`);
    return response.data.chamado;
  },

  async criar(dados) {
    const response = await api.post('/chamado/criar', dados);
    return response.data;
  },

  async editar(id, dados) {
    const response = await api.put(`/chamado/editar/${id}`, dados);
    return response.data;
  },

  async deletar(id) {
    const response = await api.delete(`/chamado/deletar/${id}`);
    return response.data;
  },
};
