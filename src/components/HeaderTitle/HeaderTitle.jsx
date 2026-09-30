import React from 'react';

export const HeaderTitle = ({ title, subtitle, description }) => {
  return (
    <div className='mx-auto mb-15 max-w-[400px] text-center'>
      <p className='text-sm font-bold text-red-600'>{subtitle}</p>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <p className='text-xs text-gray-400'>{description}</p>
    </div>
  );
};

export default HeaderTitle;