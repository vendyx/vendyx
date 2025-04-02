import { DiscountType } from '@/api/types';

import { useDiscountContext } from '../../contexts/discount-context';
import { DiscountDurationCard } from '../discount-details-card/discount-duration-card';
import { DiscountGeneralCard } from '../discount-details-card/discount-general-card';
import { DiscountRequirementsCard } from '../discount-details-card/discount-requirements-card';
import { DiscountStatusCard } from '../discount-details-card/discount-status-card';
import { ProductDiscountMetadata } from '../product-discount-metadata/product-discount-metadata';
import { RemoveDiscountButton } from '../remove-discount-button/remove-discount-button';
import { ShippingDiscountMetadata } from '../shipping-discount-metadata/shipping-discount-metadata';
import { DiscountDetailsFormSubmitButton } from './discount-details-form-submit-button';

export const DiscountDetails = () => {
  const { type, discount } = useDiscountContext();

  return (
    <div className="flex flex-col lg:grid grid-cols-6 gap-6">
      <div className="col-span-4 flex flex-col gap-6">
        <DiscountGeneralCard />

        <DiscountDurationCard />

        {type === DiscountType.Product && <ProductDiscountMetadata />}
        {type === DiscountType.Shipping && <ShippingDiscountMetadata />}

        <DiscountRequirementsCard />
        {discount && (
          <div className="flex w-full gap-3 justify-end">
            <RemoveDiscountButton discount={discount} />
            <DiscountDetailsFormSubmitButton discount={discount} size="sm" />
          </div>
        )}
      </div>
      <div className="col-span-2 flex flex-col gap-6">
        <DiscountStatusCard />
      </div>
    </div>
  );
};
