import React from 'react';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import SlickSlider from 'react-slick';
import Guts from '../../assets/TestimonialImg/Guts.png';
import Riley from '../../assets/TestimonialImg/Riley.jpg';
import Tiredcat from '../../assets/TestimonialImg/Tiredcat.png';
import Yuji from '../../assets/TestimonialImg/yuji.jpg';
import OverfedTiger from '../../assets/TestimonialImg/OverfedTiger.png';




const Slider = SlickSlider.default ?? SlickSlider;

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  mobileFirst: true,
  autoplaySpeed: 3000,
  cssEase: 'linear',
  pauseOnHover: true,
};

const TestimonialData = [
  {
    id: 1,
    name: 'Guts',
    testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae reiciendis inventore nisi vitae, rem ducimus impedit.',
    img: Guts,
  },
  {
    id: 2,
    name: 'OverfedTiger',
    testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae reiciendis inventore nisi vitae, rem ducimus impedit.',
    img: OverfedTiger,
  },
  {
    id: 3,
    name: 'Riley Freeman',
    testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae reiciendis inventore nisi vitae, rem ducimus impedit.',
    img: Riley,
  },
  {
    id: 4,
    name: 'Tiredcat',
    testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae reiciendis inventore nisi vitae, rem ducimus impedit.',
    img: Tiredcat,
  },
  {
    id: 5,
    name: 'Yuji Itadori',
    testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae reiciendis inventore nisi vitae, rem ducimus impedit.',
    img: Yuji,
  },
];

export const Testimonial = () => {
  return (
    <section id='Testimonial' className='py-10'>
      <div>
        <HeaderTitle
          title={'Testimonial'}
          subtitle={'What our users say'}
          description={'lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis delectus architecto error'}
        />

        <div className='mx-auto max-w-3xl px-4' data-aos='fade-up'>
          <Slider {...settings}>
            {TestimonialData.map((item) => (
              <div key={item.id} className='px-' data-aos='zoom-in' data-aos-delay={item.id * 100}>
                <div className='flex flex-col items-center rounded-2xl bg-gray-100 p-6 text-center shadow-lg'>
                  <img
                    src={item.img}
                    alt={item.name}
                    className='mb-4 h-20 w-20 rounded-full object-cover'
                  />
                  <p className='mb-4 text-sm text-gray-600'>{item.testimonial}</p>
                  <h3 className='text-lg font-semibold text-red-600'>{item.name}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
