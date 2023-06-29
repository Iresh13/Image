import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {IStyles} from '../app.types';
import {FONTS} from '../themes/fonts';
import {COLORS} from '../themes/color';

interface TextProps {
  text: string;
  style?: IStyles;
  variation: string;
}

const GenericText = ({text, variation = 'regular', style}: TextProps) => {
  const getTextVariation = () => {
    return variation?.split(' ').map((variant: string) => styles[variant]);
  };

  return <Text style={[styles.bold, style, getTextVariation()]}>{text}</Text>;
};

const styles = StyleSheet.create<IStyles>({
  regular: {
    fontWeight: '300',
    color: COLORS.BLACK,
    fontSize: FONTS.MEDIUM_FONT_SIZE,
  },
  title: {
    color: COLORS.BLACK,
    fontSize: FONTS.SECONDARY_FONT_SIZE,
  },
  bold: {
    fontWeight: 'bold',
    color: COLORS.BLACK,
    fontSize: FONTS.MEDIUM_FONT_SIZE,
  },
  white: {
    color: COLORS.WHITE,
  },
  large: {
    fontSize: FONTS.SECONDARY_FONT_SIZE,
  },
  center: {
    textAlign: 'center',
  },
});

export default GenericText;
