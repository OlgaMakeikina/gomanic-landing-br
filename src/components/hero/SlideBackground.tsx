import Image from 'next/image'

interface SlideBackgroundProps {
  slides: Array<{ id: number; image: string }>
  currentSlide: number
}

export default function SlideBackground({ slides, currentSlide }: SlideBackgroundProps) {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.image.startsWith('#') ? (
            <div className="w-full h-full" style={{ backgroundColor: slide.image }}></div>
          ) : (
            <Image
              src={slide.image}
              alt={`Slide ${slide.id}`}
              fill
              className="object-cover"
              priority={index === currentSlide}
              sizes="100vw"
            />
          )}
        </div>
      ))}
    </div>
  )
}
