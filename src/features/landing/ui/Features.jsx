import { FEATURES } from '../store/data';
import { SectionHeading } from './SectionHeading';

export const Features = () => (
  <section
    id='features'
    className='mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-20'
  >
    <SectionHeading eyebrow='Features' title='Everything a shared tab needs' />
    <div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-10 gap-y-8'>
      {FEATURES.map(({ Icon, title, body }) => (
        <div key={title} className='flex gap-4'>
          <div className='flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-1000'>
            <Icon size={22} />
          </div>
          <div className='flex flex-col gap-1.5'>
            <h3 className='text-base font-bold'>{title}</h3>
            <p className='text-sm leading-[1.55] text-text-description'>
              {body}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
