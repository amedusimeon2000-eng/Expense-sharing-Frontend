import { cn } from '@/utils/cn';

export const Table = ({ children, className }) => (
  <div className='overflow-auto'>
    <table className={cn('w-full min-w-[600px] border-collapse', className)}>{children}</table>
  </div>
);
