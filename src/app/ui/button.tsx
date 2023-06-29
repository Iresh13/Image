import React, {ReactNode} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import GenericText from './text';
import {IStyles} from '../app.types';
import {COLORS} from '../themes/color';

interface Button {
  title?: string;
  style: IStyles;
  variation: string;
  children?: ReactNode;
  onButtonPressed: () => void;
}

const GenericButton = ({
  title,
  style,
  children,
  variation,
  onButtonPressed,
}: Button): JSX.Element => {
  const getButtonVariation = () => {
    return variation?.split(' ').map((variant: string) => styles[variant]);
  };

  return (
    <TouchableOpacity onPress={onButtonPressed}>
      <View style={[styles.button, getButtonVariation(), style]}>
        {children ? (
          children
        ) : (
          <GenericText variation="regular white" text={title as string} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<IStyles>({
  button: {
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.GREEN,
    backgroundColor: COLORS.GREEN,
  },
  md: {
    borderRadius: 50,
  },
  primary: {
    color: COLORS.WHITE,
    borderColor: COLORS.GREEN,
    backgroundColor: COLORS.GREEN,
  },
  outlineCancel: {
    borderWidth: 1,
    color: COLORS.RED,
    borderColor: COLORS.WHITE,
    backgroundColor: COLORS.WHITE,
  },

  fab: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  red: {
    color: COLORS.WHITE,
    borderColor: COLORS.RED,
    backgroundColor: COLORS.RED,
  },
});

export default GenericButton;
