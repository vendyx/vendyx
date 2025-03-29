import { DiscountType } from '@/api/types';

import { useDiscountContext } from '../../contexts/discount-context';
import { DiscountDurationCard } from '../discount-details-card/discount-duration-card';
import { DiscountGeneralCard } from '../discount-details-card/discount-general-card';
import { DiscountRequirementsCard } from '../discount-details-card/discount-requirements-card';
import { DiscountStatusCard } from '../discount-details-card/discount-status-card';
import { ProductDiscountMetadata } from '../product-discount-metadata/product-discount-metadata';

export const DiscountDetails = () => {
  const { type } = useDiscountContext();

  return (
    <div className="flex flex-col lg:grid grid-cols-6 gap-6">
      <div className="col-span-4 flex flex-col gap-6">
        <DiscountGeneralCard />

        <DiscountDurationCard />

        {type === DiscountType.Product && <ProductDiscountMetadata />}

        <DiscountRequirementsCard />
      </div>
      <div className="col-span-2 flex flex-col gap-6">
        <DiscountStatusCard />
      </div>
    </div>
  );
};
