import {
  Address,
  Asset,
  Customer,
  OptionValue,
  Order,
  OrderLine,
  Product,
  Shipment,
  Shop,
  Variant
} from '@prisma/client';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  render
} from '@react-email/components';
import * as React from 'react';

import { formatOrderCode } from '@/business/order/order.utils';
import { getFormattedPrice } from '@/business/shared/utils/price.utils';

import { OrderFooter } from './shared/order-footer';

const Component: React.FC<Props> = ({ order, shop }) => {
  const customerName = order.customer?.firstName ?? order.customer?.lastName;
  const { customer, shipment } = order;
  const shippingAddress = order.shippingAddress as unknown as Address;

  return (
    <Html>
      <Head />
      <Preview>Order code {formatOrderCode(order.code)}</Preview>
      <Tailwind>
        <Body className="font-sans">
          <Container className="w-[600px] max-w-full">
            <Section>
              <Heading className="text-black text-[24px] font-normal mb-2">{shop.name}</Heading>
              <Text className="text-[#666666] !my-0">ORDER {formatOrderCode(order.code)}</Text>
              <Heading className="text-black text-[30px] font-normal">
                {customerName}, Thanks for your purchase!
              </Heading>
              <Text className="text-[#666666] text-[16px]">
                We're getting your order ready to be shipped. We will notify you when it has been
                sent.
              </Text>
              {/* TODO: Add storefront url */}
              <Button className="bg-[#000000] rounded text-white text-[14px] font-semibold no-underline text-center px-5 py-3">
                View order
              </Button>
            </Section>
            {/* Order summary */}
            <Section>
              <Heading className="text-black text-[20px] font-normal mt-[80px]">
                Order summary
              </Heading>
              {order.lines.map((line, i) => (
                <Row key={line.id} className={order.lines.length - 1 === i ? '' : 'mb-8'}>
                  <Column>
                    {/* TODO: add image placeholder */}
                    <Img
                      alt={line.variant.product.name}
                      className="rounded-[8px] object-cover mr-2"
                      height={110}
                      src={line.variant.asset?.source ?? line.variant.product.assets[0].source}
                    />
                  </Column>
                  <Column className="w-full">
                    <Text className="text-[16px] text-black">
                      {line.variant.product.name} (x {line.quantity})
                    </Text>
                    <Text className="text-[#666666] text-[16px]">
                      {line.variant.optionValues.map(v => v.name).join(' / ')}
                    </Text>
                  </Column>
                  <Column className="w-full">
                    <Text className="text-[16px] text-right text-black">
                      {getFormattedPrice(line.linePrice)}
                    </Text>
                  </Column>
                </Row>
              ))}
              <Hr />
              <Row>
                <Column className="w-1/2"></Column>
                <Column>
                  <Row>
                    <Column>
                      <Text className="text-[#666666] text-[16px] !my-1">Subtotal</Text>
                    </Column>
                    <Column align="right">
                      <Text className="text-[16px] !my-1 text-black">
                        {getFormattedPrice(order.subtotal)}
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Text className="text-[#666666] text-[16px] !my-1">Shipment</Text>
                    </Column>
                    <Column align="right">
                      <Text className="text-[16px] !my-1 text-black">
                        {getFormattedPrice(shipment?.amount ?? 0)}
                      </Text>
                    </Column>
                  </Row>
                  <Hr />
                  <Row>
                    <Column>
                      <Text className="text-[#666666] text-[16px] !my-1">Total</Text>
                    </Column>
                    <Column align="right">
                      <Text className="text-[16px] !my-1 text-black">
                        {getFormattedPrice(order.total)}
                      </Text>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Section>
            {/* Customer information & Shipping to */}
            <Section>
              <Row>
                <Column className="w-1/2">
                  <Heading className="text-black text-[20px] font-normal mt-[80px]">
                    Customer information
                  </Heading>
                  <Text className="text-[#666666] text-[16px] !my-1">
                    {`${customer?.firstName} ${customer?.lastName}`}
                  </Text>
                  <Text className="text-[#666666] text-[16px] !my-1">{customer?.phoneNumber}</Text>
                  <Text className="text-[#666666] text-[16px] !my-1">{customer?.email}</Text>
                </Column>
                <Column className="w-1/2">
                  <Heading className="text-black text-[20px] font-normal mt-[80px]">
                    Shipping to
                  </Heading>
                  <Text className="text-[#666666] text-[16px] !my-1">
                    {shippingAddress.streetLine1} {shippingAddress.streetLine2}
                  </Text>
                  <Text className="text-[#666666] text-[16px] !my-1">
                    {shippingAddress.postalCode} {shippingAddress.city}, {shippingAddress.province}
                  </Text>
                  <Text className="text-[#666666] text-[16px] !my-1">
                    {shippingAddress.country}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Footer */}
            <OrderFooter shop={shop} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export type Props = {
  shop: Shop;
  order: Order & {
    customer: Customer | null;
    shipment: Shipment | null;
    lines: (OrderLine & {
      variant: Variant & {
        product: Product & { assets: Asset[] };
        optionValues: OptionValue[];
        asset: Asset | null;
      };
    })[];
  };
};

export default Component;

export const createOrderConfirmationTemplate = (input: Props) => render(<Component {...input} />);
