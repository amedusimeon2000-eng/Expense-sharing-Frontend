import React from 'react'
import Img1 from '../../assets/serviceImg/img1.jpg'
import Img2 from '../../assets/serviceImg/img2.jpg'
import Img3 from '../../assets/serviceImg/img3.jpg'
import Img4 from '../../assets/serviceImg/img4.jpg'
import Img5 from '../../assets/serviceImg/img5.jpg'
import HeaderTitle from '../HeaderTitle/HeaderTitle'

const ServicesData = [
    {
        id:1,
        img: Img1, 
        name: 'Add & Split Bills',
        desc: 'add who paid, split equally or custom',
    },
     {
        id:2,
        img:Img2, 
        name: 'Group Expenses',
        desc: 'Trips, Roomates, Friends, Partner',
    },
     {
        id:3,
        img: Img3, 
        name: 'Track Balances',
        desc: 'Auto calculates Who owes Who',
    }, {
        id:4,
        img: Img4, 
        name: 'Settle Debts',
        desc: 'Simplify Payments, Record Settlements',
    },
     {
        id:5,
        img:Img5, 
        name: 'Reminders & Notifications',
        desc: 'Remind you of upcoming payments.'
    },
]




export const Services = () => {
  return (
    <section id='Services' className='bg-gray-100'>
        <div className='py-12 lg:py-20'>
            <div className='container'>
                <HeaderTitle 
                title={'Services'}
                subtitle={'Our Services'}
                description={'lorem ipsum dolo sit amet consectetur adipisicing elit.Perspiciatis deletctus architecto error'}/>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center'>
                    {
                        ServicesData.map((service) => (
                            <div
                                key={service.id}
                                className='group w-full max-w-[300px] overflow-hidden rounded-2xl bg-white shadow-lg duration-500 hover:bg-red-600 hover:text-white'
                                data-aos='fade-up'
                                data-aos-delay={service.id * 100}
                            >
                                <div className='overflow-hidden'>
                                    <img
                                        src={service.img}
                                        alt={service.name}
                                        className='h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105'
                                    />
                                </div>
                                <div className='p-4'>
                                    <h3 className='text-lg font-semibold'>{service.name}</h3>
                                    <p className='mt-2 text-sm'>{service.desc}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    </section>
  )
}

export default Services