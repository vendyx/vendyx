import { PaymentMethodService } from '@/api/services/payment-method.service';
import { PaymentMethodForm } from '@/core/payment/components/payment-method-details/payment-method-form';

export default async function NewPaymentMethodPage() {
  const integrations = await PaymentMethodService.getAllHandlers();

  return <PaymentMethodForm handlers={integrations} />;
}
