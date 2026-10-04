import { cn } from '@/utils/cn';
import { IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalWidths = {
  sm: 'max-w-[500px]',
  base: 'max-w-[600px]',
  lg: 'max-w-[880px]',
};

export const BrandModal = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'base',
  bodyClassName,
  footerClassName,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
      className='overlay_bg fixed inset-0 z-[2000] flex items-center justify-center'
    >
      <div
        role='dialog'
        aria-modal='true'
        className={cn(
          'flex max-h-[90vh] w-[95%] flex-col overflow-hidden rounded-[20px] bg-white',
          modalWidths[size],
        )}
      >
        <div className='flex items-center justify-between gap-3 border-b border-grey-transparent px-5 py-3.5'>
          {typeof title === 'string' ? (
            <h2 className='text-xl font-bold text-text-header'>{title}</h2>
          ) : (
            title
          )}
          <button
            onClick={onClose}
            aria-label='Close'
            className='flex text-text-main-1'
          >
            <IconX size={20} />
          </button>
        </div>
        <div
          className={cn('flex flex-col gap-4 overflow-auto p-6', bodyClassName)}
        >
          {children}
        </div>
        {footer && (
          <div
            className={cn(
              'flex items-center justify-end gap-2 border-t border-grey-transparent px-5 py-3.5',
              footerClassName,
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};
