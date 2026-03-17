import React from 'react';

const QualityCards = () => {
  const qualities = [
    { icon: '🥚', title: 'Ingredientes Frescos', desc: 'Selecionamos os melhores ingredientes para suas receitas' },
    { icon: '👩‍🍳', title: 'Feito com Amor', desc: 'Cada doce é preparado com carinho e dedicação' },
    { icon: '🚚', title: 'Entrega Rápida', desc: 'Entregamos em toda São Paulo com todo cuidado' },
  ];

  return (
    <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      {qualities.map((q, idx) => (
        <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-smooth">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            {q.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{q.title}</h3>
          <p className="text-gray-600">{q.desc}</p>
        </div>
      ))}
    </section>
  );
};

export default QualityCards;