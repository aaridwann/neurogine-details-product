import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { View } from 'react-native';
import GeneralText, { Constants } from '@Neurogine/ui-kit-general-text';
import styles from './Badge.component.styles';
const { VARIANT } = Constants;
/**
 * BadgeTextComponent is a component that displays a badge with text.
 * @param {BadgeTextComponentProps} props - The component props.
 * @param {string} props.text - The text to display in the badge.
 * @param {string} [props.color='#0F172A'] - The color of the text.
 * @param {string} [props.backgroundColor='#F1F5F9'] - The background color of the badge.
 * @param {Object} [props.style] - The style to apply to the badge.
 * @returns {React.Component} The BadgeTextComponent.
 */
const BadgeTextComponent = ({ text, color = '#0F172A', backgroundColor = '#F1F5F9', style, }) => {
    return (_jsx(View, { style: [styles.badge, { backgroundColor }, style], children: _jsx(GeneralText, { style: { color }, variant: VARIANT.LABEL3, children: text }) }));
};
BadgeTextComponent.displayName = 'BadgeTextComponent';
export default React.memo(BadgeTextComponent);
