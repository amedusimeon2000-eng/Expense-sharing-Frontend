export const LoadingRows = ({ rows = 3 }) => (
  <div className='flex flex-col'>
    {Array.from({ length: rows }, (_, i) => (
      <div
        key={i}
        className='flex items-center gap-2.5 border-b border-grey-transparent px-4 py-3 last:border-b-0'
      >
        <div className='size-8 animate-pulse rounded-full bg-grey-25' />
        <div className='flex flex-1 flex-col gap-1.5'>
          <div className='h-3 w-2/5 animate-pulse rounded-sm bg-grey-25' />
          <div className='h-2.5 w-1/4 animate-pulse rounded-sm bg-grey-25' />
        </div>
      </div>
    ))}
  </div>
);
