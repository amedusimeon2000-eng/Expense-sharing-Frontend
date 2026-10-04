import { useDebouncedCallback } from '@/hooks/utils/useDebouncedCallback';
import { useGetSharedQueryParams } from '@/hooks/utils/useGetSharedQueryParams';
import { useUpdateRoute } from '@/hooks/utils/useUpdateRoute';
import { QUERY_SEARCH_KEYS } from '@/models/query';
import { useState } from 'react';
import { SearchInput } from './SearchInput';

export const QueryInput = ({
  className,
  inputClassName,
  placeholder,
  ariaLabel,
  paramKey = QUERY_SEARCH_KEYS.SEARCH_QUERY,
}) => {
  const { updateRoute } = useUpdateRoute();
  const { getItem } = useGetSharedQueryParams();
  const search = getItem(paramKey) ?? '';
  const [searchQuery, setSearchQuery] = useState(search);
  const [lastSearch, setLastSearch] = useState(search);

  if (search !== lastSearch) {
    setLastSearch(search);
    if (!search) setSearchQuery('');
  }

  const debouncedUpdate = useDebouncedCallback({
    callback: (value) => {
      const term = value.trim();
      if (term === search) return;

      updateRoute({ [paramKey]: term, [QUERY_SEARCH_KEYS.PAGE]: '1' });
    },
    delay: 500,
  });

  return (
    <SearchInput
      value={searchQuery}
      className={className}
      inputClassName={inputClassName}
      placeholder={placeholder}
      ariaLabel={ariaLabel}
      onChange={(value) => {
        setSearchQuery(value);
        debouncedUpdate(value);
      }}
    />
  );
};
