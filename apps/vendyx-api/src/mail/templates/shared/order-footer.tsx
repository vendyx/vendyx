import { Shop } from '@prisma/client';
import { Column, Img, Link, Row, Section, Text } from '@react-email/components';
import * as React from 'react';

import { ShopSocials } from '@/api/shared/types/gql.types';

export const OrderFooter: React.FC<Props> = ({ shop }) => {
  const socials = shop.socials as ShopSocials;

  return (
    <Section className="mt-[80px] bg-[#F7F7F7] p-4">
      <Row>
        <Column className="w-1/2">
          {shop.logo && <Img alt="React Email logo" height="42" src={shop.logo} />}
          <Text className="text-[16px] !my-2 font-semibold text-black">{shop.name}</Text>
        </Column>
        <Column className="w-1/2">
          <Row className="table-cell h-[44px] w-[56px] align-bottom">
            {socials.facebook && (
              <Column className="pr-[8px]">
                <Link href={socials.facebook}>
                  <Img
                    alt="Facebook"
                    height="36"
                    src="https://react.email/static/facebook-logo.png"
                    width="36"
                  />
                </Link>
              </Column>
            )}
            {socials.twitter && (
              <Column className="pr-[8px]">
                <Link href={socials.twitter}>
                  <Img alt="X" height="36" src="https://react.email/static/x-logo.png" width="36" />
                </Link>
              </Column>
            )}
            {socials.instagram && (
              <Column>
                <Link href={socials.instagram}>
                  <Img
                    alt="Instagram"
                    height="36"
                    src="https://react.email/static/instagram-logo.png"
                    width="36"
                  />
                </Link>
              </Column>
            )}
          </Row>
          <Row>
            {/* <Text className="!my-2 text-[16px]  leading-[24px] text-gray-500">
            123 Main Street Anytown, CA 12345
          </Text> */}
            <Text className="!mb-[0px] !mt-1 text-[16px]  leading-[24px] text-gray-500">
              {shop.email} {shop.phoneNumber}
            </Text>
          </Row>
        </Column>
      </Row>
    </Section>
  );
};

type Props = {
  shop: Shop;
};
