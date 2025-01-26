import React from 'react';

import { Blocker } from '@/shared/hooks/use-navigation-block';

const BlockerWhenDirty = ({ isDirty }: Props) => {
  return isDirty ? <Blocker /> : null;
};

type Props = {
  isDirty: boolean;
};

export default BlockerWhenDirty;
