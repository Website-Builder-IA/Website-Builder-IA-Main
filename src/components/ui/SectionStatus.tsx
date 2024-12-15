import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

interface SectionStatusProps {
  hasContent: boolean;
}

export function SectionStatus({ hasContent }: SectionStatusProps) {
  return (
    <div className="flex items-center">
      {hasContent ? (
        <div className="flex items-center text-green-600">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span className="text-xs">Conteúdo Adicionado</span>
        </div>
      ) : (
        <div className="flex items-center text-amber-600">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-xs">Pendente</span>
        </div>
      )}
    </div>
  );
}