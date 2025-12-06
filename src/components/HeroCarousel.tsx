import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Digital Transformation Initiative",
    description: "Modernizing government workflows with technology",
    color: "from-blue-900 to-blue-700",
  },
  {
    id: 2,
    title: "Service Delivery & Infrastructure",
    description: "Building resilient citizen service systems",
    color: "from-green-900 to-green-700",
  },
  {
    id: 3,
    title: "Sustainable Development Goals",
    description: "Working towards environmental sustainability",
    color: "from-purple-900 to-purple-700",
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-md z-10">
        SPOTLIGHT
      </div>

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 carousel-slide ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={`h-full bg-gradient-to-r ${slide.color} flex items-center justify-center`}>
            <div className="text-center text-white px-8 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 break-words leading-tight">{slide.title}</h2>
              <p className="text-xl md:text-2xl opacity-90 break-words leading-relaxed">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </Button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
