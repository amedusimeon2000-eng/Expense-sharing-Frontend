export const AuthHeading = ({ title, description }) => (
  <div className='flex flex-col gap-1'>
    <h2 className='text-2xl font-bold'>{title}</h2>
    <p className='text-sm text-grey-500'>{description}</p>
  </div>
);
