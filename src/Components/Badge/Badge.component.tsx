import React from 'react';

import { View } from 'react-native';

import GeneralText from '@Neurogine/ui-kit-general-text';
import { VARIANT } from '@Neurogine/ui-kit-general-text/dist/Constants';

import styles from './Badge.component.styles';

import type { BadgeTextComponentProps } from './Badge.component.types';

/**
 * BadgeTextComponent is a component that displays a badge with text.
 * @param {BadgeTextComponentProps} props - The component props.
 * @param {string} props.text - The text to display in the badge.
 * @param {string} [props.color='#0F172A'] - The color of the text.
 * @param {string} [props.backgroundColor='#F1F5F9'] - The background color of the badge.
 * @param {Object} [props.style] - The style to apply to the badge.
 * @returns {React.Component} The BadgeTextComponent.
 */
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

BadgeTextComponent.displayName = 'BadgeTextComponent';

export default React.memo(BadgeTextComponent);