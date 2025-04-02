'use client';

import { type ReactElement, type ReactNode, useEffect } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { PAGINATION_PAGE_SIZE, usePagination } from '@/shared/hooks/use-pagination';

import { LoaderSpiner } from '../loaders/loader-spiner';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import { ItemsTableEmptyState } from './items-table-empty-state';

/**
 * Display a list of items in a entity view (customer orders, collection products, etc.)
 * Paginable, searchable and with a loading state.
 *
 * Thought to be used in client side only.
 */
export const ItemsTable = <T,>({
  title,
  headers,
  items,
  renderRow,
  onChange,
  action,
  hideMutators,
  actionFallback,
  isLoading,
  emptyState
}: Props<T>) => {
  const { page, search, handleSearch, nextPage, prevPage } = usePagination();

  useEffect(() => {
    onChange?.(page, search);
  }, [search, page]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          {isLoading && <LoaderSpiner />}
          {actionFallback && isLoading ? actionFallback : action}
        </div>
      </CardHeader>

      <CardContent>
        {!hideMutators && (
          <div className="flex items-center gap-3 mb-4">
            <Input placeholder="Search..." onChange={e => handleSearch(e.target.value)} />

            <Button
              disabled={page === 1 || isLoading}
              type="button"
              variant="outline"
              onClick={() => prevPage()}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span>{page}</span>
            <Button
              type="button"
              disabled={items.length < PAGINATION_PAGE_SIZE || isLoading}
              variant="outline"
              onClick={() => items.length === PAGINATION_PAGE_SIZE && nextPage()}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map(header => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!items.length
              ? (emptyState ?? <ItemsTableEmptyState />)
              : items.map(item => renderRow(item))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type Props<T> = {
  /**
   * @description
   * The title of the table.
   */
  title: string;
  /**
   * @description
   * The headers of the table.
   */
  headers: string[];
  /**
   * @description
   * The items to display in the table.
   */
  items: T[];
  /**
   * @description
   * The function to render each row of the table.
   */
  renderRow: (row: T) => ReactElement;
  /**
   * @description
   * The function to call when the page or search changes.
   */
  onChange?: (page: number, search: string) => void;
  /**
   * @description
   * When true, search bar and pagination buttons are hidden.
   * This is useful when you want to show a list of items without any pagination or search.
   */
  hideMutators?: boolean;
  /**
   * @description
   * React node to display in the top right corner of the table.
   */
  action?: ReactNode;
  /**
   * @description
   * React node to display in the top right corner of the table when `isLoading` is true.
   */
  actionFallback?: ReactNode;
  /**
   * @description
   * When true, the table is in loading state.
   */
  isLoading?: boolean;
  /**
   * @description
   * React node to display when there are no items in the table.
   */
  emptyState?: ReactNode;
};
