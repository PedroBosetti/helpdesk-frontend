import { Edit2, Trash2, Calendar, Tag, AlertCircle } from 'lucide-react';

export function ChamadoCard({ chamado, onEditar, onDeletar, getPrioridadeCor, getStatusCor }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{chamado.titulo}</h3>
        <div className="flex gap-2 ml-2">
          <button
            onClick={() => onEditar(chamado)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Editar"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeletar(chamado.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Deletar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{chamado.descricao}</p>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Categoria:</span>
          <span className="text-sm font-medium text-gray-900">{chamado.categoria}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <AlertCircle className="w-4 h-4 text-gray-400" />
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPrioridadeCor(chamado.prioridade)}`}>
            {chamado.prioridade}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusCor(chamado.status)}`}>
            {chamado.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t">
          <Calendar className="w-4 h-4" />
          <span>Criado em: {chamado.criadoEm}</span>
        </div>
      </div>
    </div>
  );
}
