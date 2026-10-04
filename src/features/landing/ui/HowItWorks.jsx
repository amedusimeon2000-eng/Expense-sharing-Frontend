import { HOW_IT_WORKS } from '../store/data';
import { SectionHeading } from './SectionHeading';

export const HowItWorks = () => (
  <section
    id='how'
    className='border-y border-grey-transparent bg-surface-level-2'
  >
    <div className='mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-20'>
      <SectionHeading
        eyebrow='How it works'
        title='From the first receipt to the last transfer'
      />
      <div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4'>
        {HOW_IT_WORKS.map((step, index) => (
          <div
            key={step.title}
            className='flex flex-col gap-3.5 rounded-lg border border-grey-transparent bg-white p-6'
          >
            <span className='flex size-8 items-center justify-center rounded-md bg-orange-100 text-sm font-bold text-orange-1000'>
              {index + 1}
            </span>
            <h3 className='text-lg font-bold'>{step.title}</h3>
            <p className='text-sm leading-[1.55] text-text-description'>
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
