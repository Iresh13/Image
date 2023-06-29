import React from 'react';
import Ant from 'react-native-vector-icons/AntDesign';
import {Image, View, Dimensions, StyleSheet, Platform} from 'react-native';

import {IImage} from '../app/app.types';
import {APP} from '../app/app.constant';
import {COLORS} from '../app/themes/color';

interface ImageProps {
  image: IImage;
}

const {width} = Dimensions.get('screen');

const ImageComponent = ({image}: ImageProps) => {
  return (
    <>
      {image.isSelected && (
        <View style={styles.tickIcon}>
          <Ant name="checkcircle" size={20} color={COLORS.GREEN} />
        </View>
      )}
      <Image
        style={styles.imageView}
        source={{uri: Platform.OS === APP.IOS ? image.sourceURL : image.path}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageView: {
    borderRadius: 10,
    width: (width - 120) / 3,
    height: (width - 120) / 3,
  },
  tickIcon: {
    top: -10,
    right: -7,
    zIndex: 999,
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
  },
});

export default ImageComponent;
