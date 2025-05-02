
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import BookingDialog from './BookingDialog';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Tours = () => {
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [tours, setTours] = useState<any[]>([]);
  const [visibleTours, setVisibleTours] = useState<any[]>([]);
  const [showAllTours, setShowAllTours] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchTours();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      setIsAdmin(data?.role === 'admin');
    }
  };

  const fetchTours = async () => {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('id');
    
    if (error) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setTours(data || []);
    
    // Initially show only featured or first 3 tours
    if (data) {
      const featured = data.filter(tour => tour.featured);
      setVisibleTours(featured.length >= 3 ? featured : data.slice(0, 3));
    }
  };

  const handleBooking = (tourId: number) => {
    setSelectedTourId(tourId);
    setIsBookingOpen(true);
  };

  const handleShowAllTours = () => {
    setShowAllTours(true);
    setVisibleTours(tours);
  };

  const handleDeleteTour = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent element events

    if (!confirm('Вы уверены, что хотите удалить этот тур?')) {
      return;
    }
    
    const { error } = await supabase
      .from('tours')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Успех",
      description: "Тур успешно удален",
    });
    
    fetchTours();
  };

  return (
    <section id="tours" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-turkestan-blue mb-4">
            Популярные туры
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Исследуйте Туркестанскую область с нашими тщательно подобранными маршрутами
          </p>
          {isAdmin && (
            <Button 
              className="bg-turkestan-purple hover:bg-turkestan-blue mt-4 flex items-center gap-2 mx-auto"
              onClick={() => navigate('/admin/tours/new')}
            >
              <Plus className="h-4 w-4" />
              Добавить новый тур
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden border border-gray-200 hover:border-turkestan-purple transition-colors relative">
              {isAdmin && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="absolute top-2 right-2 z-10 opacity-80 hover:opacity-100"
                  onClick={(e) => handleDeleteTour(tour.id, e)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <div className="relative h-48">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                {tour.featured && (
                  <Badge className="absolute top-2 left-2 bg-turkestan-gold">
                    Популярное
                  </Badge>
                )}
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-turkestan-dark">{tour.title}</h3>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-turkestan-purple" />
                    <span>Продолжительность: {tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-turkestan-purple" />
                    <span>Размер группы: {tour.group_size}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-turkestan-purple" />
                    <span>Даты: {tour.start_dates}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t border-gray-200 pt-4">
                <div>
                  <span className="text-sm text-gray-500">От</span>
                  <span className="text-xl font-bold text-turkestan-purple ml-1">{tour.price}</span>
                </div>
                <Button 
                  className="bg-turkestan-purple hover:bg-turkestan-blue"
                  onClick={() => handleBooking(tour.id)}
                >
                  Забронировать
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {!showAllTours && tours.length > visibleTours.length && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-turkestan-purple text-turkestan-purple hover:bg-turkestan-purple hover:text-white"
              onClick={handleShowAllTours}
            >
              Все туры <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {selectedTourId && (
        <BookingDialog
          isOpen={isBookingOpen}
          onClose={() => {
            setIsBookingOpen(false);
            setSelectedTourId(null);
          }}
          tourId={selectedTourId}
        />
      )}
    </section>
  );
};

export default Tours;
