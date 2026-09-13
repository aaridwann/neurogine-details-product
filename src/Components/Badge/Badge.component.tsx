import React from 'react';

import { View } from 'react-native';

import GeneralText from '@Neurogine/ui-kit-general-text';
import { VARIANT } from '@Neurogine/ui-kit-general-text/dist/Constants';

import styles from './Badge.component.styles';

import type { BadgeTextComponentProps } from './Badge.component.types';

const BadgeTextComponent: React.FC<BadgeTextComponentProps> = ({
  text,
  color = '#0F172A',
  backgroundColor = '#F1F5F9',
  style,
}): React.ReactNode => {
  return (
    <View style={[styles.badge, { backgroundColor }, style]}>
      <GeneralText style={{ color }} variant={VARIANT.LABEL3}>
        {text}
      </GeneralText>
    </View>
  );
};

export default React.memo(BadgeTextComponent);