'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = () => {
  const slides = [
    {
      bg_image: 'bg-[url("/hero1.jpg")]',
      title: 'IT and Management',
    },
    {
      bg_image: 'bg-[url("/hero2.jpg")]',
      title: 'Engineering Trades',
    },
    {
      bg_image: 'bg-[url("/hero3.jpg")]',
      title: 'Medical Sciences',
    },
    {
      bg_image: 'bg-[url("/hero3.jpg")]',
      title: 'Health and Safety',
    },
  ];

  const [isNavigationEnabled, setIsNavigationEnabled] = useState(true);

  useEffect(() => {
    const checkWidth = () => {
      setIsNavigationEnabled(window.innerWidth >= 768);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={isNavigationEnabled}
        pagination={{ clickable: true }}
        spaceBetween={30}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        slidesPerView={1}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`relative ${slide.bg_image} bg-cover bg-center w-full h-[600px]`}>

              <div className="relative z-10 w-full max-w-[1070px] mx-auto h-full p-8 flex text-white flex-col items-center justify-center">
                <h2 className="absolute bottom-10 text-[24px] font-bold my-2 text-center uppercase">
                  {slide.title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
