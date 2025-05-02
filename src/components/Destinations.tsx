
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDestinations } from '@/hooks/use-destinations';

interface DestinationsProps {
  showAllByDefault?: boolean;
}

const Destinations: React.FC<DestinationsProps> = ({ showAllByDefault = false }) => {
  const { destinations, isAdmin } = useDestinations();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(showAllByDefault);
  
  // Show only 4 destinations initially, unless showAllByDefault is true
  const visibleDestinations = showAll ? destinations : destinations.slice(0, 4);

  const handleVisitLocation = (googleMapsUrl: string) => {
    window.open(googleMapsUrl, '_blank');
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="destinations" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-turkestan-blue mb-4">
            Популярные направления
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Изучите самые красивые и исторически значимые места Туркестанской области
          </p>
          {isAdmin && (
            <Button 
              className="bg-turkestan-purple hover:bg-turkestan-blue mt-4"
              onClick={() => navigate('/admin/destinations')}
            >
              Управление направлениями
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDestinations.map((destination) => (
            <div key={destination.id} className="destination-card h-80 group">
              <Card className="border-none h-full overflow-hidden">
                <CardContent className="p-0 h-full relative">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 flex flex-col justify-end">
                    <div className="flex items-center text-white mb-2">
                      <MapPin className="w-5 h-5 mr-2 text-turkestan-gold" />
                      <p className="font-medium">{destination.name}</p>
                    </div>
                    <p className="text-white/80 text-sm">{destination.description}</p>
                    
                    <Button 
                      variant="secondary"
                      className="mt-4 bg-turkestan-gold/90 hover:bg-turkestan-gold text-white border-none flex items-center gap-2"
                      onClick={() => handleVisitLocation(destination.google_maps_url)}
                    >
                      <Navigation className="h-4 w-4" /> Посетить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {!showAll && destinations.length > 4 && (
          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              className="border-turkestan-purple text-turkestan-purple hover:bg-turkestan-purple hover:text-white"
              onClick={toggleShowAll}
            >
              {showAll ? 'Показать меньше' : 'Показать все направления'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Destinations;
