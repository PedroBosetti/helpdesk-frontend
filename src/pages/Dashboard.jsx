import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { chamadosService } from '../services/chamados';
import { ChamadoCard } from '../components/ChamadoCard';
import { ChamadoModal } from '../components/ChamadoModal';
import { Plus, LogOut, Ticket, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [chamadoEditando, setChamadoEditando] = useState(null);
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const carregarChamados = async () => {
    try {
      setLoading(true);
      const dados = await chamadosService.listarTodos();
      setChamados(dados);
      setErro('');
    } catch (error) {
      setErro('Erro ao carregar chamados');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarChamados();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNovoChamado = () => {
    setChamadoEditando(null);
    setModalAberto(true);
  };

  const handleEditarChamado = (chamado) => {
    setChamadoEditando(chamado);
    setModalAberto(true);
  };

  const handleDeletarChamado = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este chamado?')) {
      try {
        await chamadosService.deletar(id);
        await carregarChamados();
      } catch (error) {
        alert('Erro ao deletar chamado');
      }
    }
  };

  const handleSalvarChamado = async () => {
    setModalAberto(false);
    await carregarChamados();
  };

  const getPrioridadeCor = (prioridade) => {
    const cores = {
      baixa: 'bg-green-100 text-green-800',
      media: 'bg-yellow-100 text-yellow-800',
      alta: 'bg-red-100 text-red-800',
    };
    return cores[prioridade] || 'bg-gray-100 text-gray-800';
  };

  const getStatusCor = (status) => {
    const cores = {
      aberto: 'bg-blue-100 text-blue-800',
      'em andamento': 'bg-purple-100 text-purple-800',
      resolvido: 'bg-green-100 text-green-800',
      fechado: 'bg-gray-100 text-gray-800',
    };
    return cores[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Helpdesk</h1>
                <p className="text-sm text-gray-600">Bem-vindo, {usuario?.nome}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Meus Chamados</h2>
            <p className="text-gray-600 mt-1">
              {chamados.length} {chamados.length === 1 ? 'chamado' : 'chamados'}
            </p>
          </div>
          <button
            onClick={handleNovoChamado}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            <Plus className="w-5 h-5" />
            Novo Chamado
          </button>
        </div>

        {erro && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span>{erro}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : chamados.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum chamado encontrado</h3>
            <p className="text-gray-600 mb-4">Crie seu primeiro chamado para começar</p>
            <button
              onClick={handleNovoChamado}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <Plus className="w-5 h-5" />
              Criar Chamado
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {chamados.map((chamado) => (
              <ChamadoCard
                key={chamado.id}
                chamado={chamado}
                onEditar={handleEditarChamado}
                onDeletar={handleDeletarChamado}
                getPrioridadeCor={getPrioridadeCor}
                getStatusCor={getStatusCor}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {modalAberto && (
        <ChamadoModal
          chamado={chamadoEditando}
          onClose={() => setModalAberto(false)}
          onSalvar={handleSalvarChamado}
        />
      )}
    </div>
  );
}
