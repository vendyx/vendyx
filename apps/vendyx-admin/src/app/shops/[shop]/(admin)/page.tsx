import { Suspense } from 'react';

import { type MetricRange } from '@/api/scalars/scalars.type';
import { MetricsCharts } from '@/core/metrics/components/metrics-charts/metrics-charts';
import { getDefaultDateRange } from '@/core/metrics/utils/date-range';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { MetricsSkeleton } from '@/shared/components/skeletons/metrics-skeleton';

export default async function Home({ searchParams }: { searchParams: MetricRange }) {
  const isRangeInSearchParams = searchParams.startsAt && searchParams.endsAt;

  const range: MetricRange = isRangeInSearchParams
    ? { startsAt: new Date(searchParams.startsAt), endsAt: new Date(searchParams.endsAt) }
    : getDefaultDateRange();

  return (
    <AdminPageLayout title="Dashboard">
      <div className="flex flex-col gap-8">
        <main>
          <Suspense fallback={<MetricsSkeleton />}>
            <MetricsCharts range={range} />
          </Suspense>
        </main>
        {/* <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <DotIcon className="text-distinct w-8 h-8" />
            <h2 className="font-semibold text-base">Pending</h2>
          </div>
          <div>
            <Button variant="secondary" className="flex gap-2">
              <InboxIcon className="w-4 h-4" />8 orders to fulfill
            </Button>
          </div>
        </div> */}
      </div>
    </AdminPageLayout>
  );
}
