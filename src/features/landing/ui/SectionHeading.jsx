export const SectionHeading = ({ eyebrow, title }) => (
  <div className='flex max-w-[560px] flex-col gap-2'>
    <p className='text-13 font-semibold text-orange-1000'>{eyebrow}</p>
    <h2 className='text-[34px] leading-[1.15] font-extrabold tracking-[-0.8px] text-balance'>
      {title}
    </h2>
  </div>
);
