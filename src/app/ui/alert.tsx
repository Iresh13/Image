import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {FONTS} from '../themes/fonts';
import {COLORS} from '../themes/color';
import {STYLES} from '../themes/styles';

import GenericText from './text';
import GenericButton from './button';

import {IStyles} from '../app.types';

const {width, height} = Dimensions.get('screen');

export interface IModalProps {
  title: string;
  description: string;
  modalHeight: number;
  onSubmit: () => void;
  onCancel: () => void;
}

const GenericAlert = ({
  title,
  onCancel,
  onSubmit,
  modalHeight,
  description,
}: IModalProps) => {
  const opacity = useSharedValue(0);
  const marginTop = useSharedValue(0);
  const viewHeight = useSharedValue(0);

  // animate the modal.
  useEffect(() => {
    (viewHeight.value = withTiming(modalHeight, {
      duration: 300,
      easing: Easing.linear,
    })),
      (opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.linear,
      })),
      (marginTop.value = withTiming(modalHeight, {
        duration: 300,
        easing: Easing.linear,
      }));
  }, [marginTop, modalHeight, opacity, viewHeight]);

  const animatedModal = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      height: viewHeight.value,
      marginTop: marginTop.value,
    };
  }, []);

  return (
    <View style={styles.modal}>
      <Animated.View
        style={[styles.backgroundView(viewHeight.value), animatedModal]}>
        <View style={styles.children}>
          <View>
            <GenericText
              text={title}
              variation="bold center"
              style={styles.text}
            />

            <GenericText
              text={description}
              variation="regular center"
              style={styles.childrenText}
            />

            <View style={styles.center}>
              <View style={styles.row}>
                <GenericButton
                  title="Delete"
                  style={styles.button}
                  variation="md danger"
                  onButtonPressed={onSubmit}
                />
              </View>

              <GenericButton
                title="Cancel"
                variation="md red"
                style={styles.button}
                onButtonPressed={onCancel}
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create<IStyles>({
  modal: {
    width: width,
    height: height,
    borderRadius: 2,
    backgroundColor: COLORS.MODAL_BG,
  },
  center: {
    height: 50,
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    lineHeight: 25,
    paddingTop: 20,
    fontWeight: '600',
    color: COLORS.BLACK,
    fontSize: FONTS.MEDIUM_FONT_SIZE,
  },
  button: {
    width: width * 0.5 - 35,
  },
  row: {
    marginRight: 15,
  },
  children: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childrenText: {
    marginVertical: 20,
  },
  backgroundView: (viewHeight: number) => ({
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 2,
    height: viewHeight,
    position: 'absolute',
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORS.WHITE,
    shadowColor: STYLES.SHADOW_COLOR,
    shadowOffset: STYLES.SHADOW_OFFSET,
    shadowOpacity: STYLES.SHADOW_OPACITY,
  }),
});

export default GenericAlert;
