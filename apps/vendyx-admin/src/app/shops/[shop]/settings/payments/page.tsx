import { PaymentMethodService } from '@/api/services/payment-method.service';
import { PaymentMethodsTable } from '@/core/payment/components/payment-methods-table/payment-methods-table';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout/settings-page-layout';

export default async function PaymentMethodsPage() {
  const paymentMethods = await PaymentMethodService.getAll();

  return (
    <SettingsPageLayout title="Payments" subtitle="Manage your payment methods">
      <PaymentMethodsTable paymentMethods={paymentMethods} />
    </SettingsPageLayout>
  );
}
