import { DiscountDurationCard } from '../discount-details-card/discount-duration-card';
import { DiscountGeneralCard } from '../discount-details-card/discount-general-card';
import { DiscountRequirementsCard } from '../discount-details-card/discount-requirements-card';
import { DiscountStatusCard } from '../discount-details-card/discount-status-card';

export const DiscountDetails = () => {
  return (
    <div className="flex flex-col lg:grid grid-cols-6 gap-6">
      <div className="col-span-4 flex flex-col gap-6">
        <DiscountGeneralCard />

        <DiscountDurationCard />

        <DiscountRequirementsCard />
      </div>
      <div className="col-span-2 flex flex-col gap-6">
        <DiscountStatusCard />
      </div>
    </div>
  );
};
