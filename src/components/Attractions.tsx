
import React from 'react';
import { Landmark, Route, Map, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const attractionCategories = [
  {
    id: 1,
    name: 'Исторические места',
    description: 'Исследуйте древние города, мавзолеи и археологические памятники',
    icon: <Landmark className="h-8 w-8" />,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 2,
    name: 'Природные чудеса',
    description: 'Откройте для себя завораживающие пейзажи и природные заповедники',
    icon: <Map className="h-8 w-8" />,
    color: 'bg-green-100 text-green-700'
  },
  {
    id: 3,
    name: 'Культурный опыт',
    description: 'Погрузитесь в богатую культуру и традиции Туркестанской области',
    icon: <Camera className="h-8 w-8" />,
    color: 'bg-yellow-100 text-yellow-700'
  },
  {
    id: 4,
    name: 'Туристические маршруты',
    description: 'Следуйте по проверенным маршрутам для незабываемых приключений',
    icon: <Route className="h-8 w-8" />,
    color: 'bg-purple-100 text-purple-700'
  }
];

const Attractions = () => {
  return (
    <section id="attractions" className="py-16 bg-turkestan-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-turkestan-blue mb-4">
            Удивительные достопримечательности
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Откройте для себя богатство культурного и природного наследия Туркестана
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractionCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${category.color} p-3 rounded-full inline-block mb-4`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-turkestan-dark">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              <Button variant="link" className="p-0 text-turkestan-purple font-medium">
                Подробнее
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Attractions;
