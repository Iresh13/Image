import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {
  check,
  request,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';
import {Platform} from 'react-native';
import React, {useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import {COLORS} from '../themes/color';
import {STYLES} from '../themes/styles';

import {IImage, IStyles} from '../app.types';
import {APP, PERMISSION} from '../app.constant';

interface IFabView {
  rightValue: number;
  onHide: () => void;
  bottomValue: number;
  showFabButtons: boolean;
  animatedRightValue: number;
  animatedBottomValue: number;
  onImage: (image: IImage) => void;
}

const {width} = Dimensions.get('screen');

const FabView = ({
  onHide,
  onImage,
  rightValue,
  bottomValue,
  showFabButtons,
  animatedRightValue,
  animatedBottomValue,
}: IFabView) => {
  const right = useSharedValue(rightValue);
  const bottom = useSharedValue(bottomValue);

  useEffect(() => {
    if (showFabButtons) {
      return animateView();
    }

    return hideView();
  }, [showFabButtons]);

  const animatedModal = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,
      right: right.value,
    };
  }, []);

  // animate the menu button once button is pressed
  const animateView = () => {
    (bottom.value = withTiming(animatedBottomValue, {
      duration: 300,
      easing: Easing.linear,
    })),
      (right.value = withTiming(animatedRightValue, {
        duration: 300,
        easing: Easing.linear,
      }));
  };

  const hideView = () => {
    (bottom.value = withTiming(bottomValue, {
      duration: 300,
      easing: Easing.linear,
    })),
      (right.value = withTiming(rightValue, {
        duration: 300,
        easing: Easing.linear,
      }));
  };

  //check for permission
  const checkIosGalleryPermission = () => {
    return check(PERMISSIONS.IOS.PHOTO_LIBRARY).then(status => {
      if (status === PERMISSION.GRANTED || status === PERMISSION.LIMITED) {
        return openPicker();
      }

      return getGalleryPermission();
    });
  };

  const checkIosCameraPermission = () => {
    return check(PERMISSIONS.IOS.CAMERA).then(status => {
      if (status === PERMISSION.GRANTED) {
        return openCamera();
      }

      return getCameraPermission();
    });
  };

  const checkAndroidCameraPermission = () => {
    check(PERMISSIONS.ANDROID.CAMERA).then(status => {
      if (status === PERMISSION.GRANTED) {
        return openCamera();
      }

      return getCameraPermission();
    });
  };

  const checkAndroidGalleryPermission = () => {
    if (Platform.Version === 33) {
      check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(status => {
        if (status === PERMISSION.GRANTED) {
          return openPicker();
        }

        return getGalleryPermission();
      });
    } else {
      check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(status => {
        if (status === PERMISSION.GRANTED) {
          return openPicker();
        }

        return getGalleryPermission();
      });
    }
  };

  const getCameraPermission = () => {
    if (Platform.OS === APP.IOS) {
      return request(PERMISSIONS.IOS.CAMERA).then(status => {
        if (status === PERMISSION.GRANTED) {
          return openCamera();
        }

        return setTimeout(() => openSettings(), 1000);
      });
    }

    //requests for permission
    request(PERMISSIONS.ANDROID.CAMERA).then(status => {
      if (status === PERMISSION.GRANTED) {
        return openCamera();
      }

      return setTimeout(() => openSettings(), 1000);
    });
  };

  const getGalleryPermission = () => {
    if (Platform.OS === APP.IOS) {
      return request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(status => {
        if (status === PERMISSION.GRANTED || status === PERMISSION.LIMITED) {
          return openPicker();
        }

        return setTimeout(() => openSettings(), 1000);
      });
    }

    if (Platform.Version === 33) {
      request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(status => {
        if (status === PERMISSION.GRANTED) {
          return openPicker();
        }
        return setTimeout(() => openSettings(), 1000);
      });
    } else {
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(status => {
        if (status === PERMISSION.GRANTED) {
          return openPicker();
        }
        return setTimeout(() => openSettings(), 1000);
      });
    }
  };

  const checkCameraPermission = async () => {
    if (Platform.OS === APP.IOS) {
      return await checkIosCameraPermission();
    }

    return checkAndroidCameraPermission();
  };

  const checkGalleryPermission = () => {
    if (Platform.OS === APP.IOS) {
      return checkIosGalleryPermission();
    }

    return checkAndroidGalleryPermission();
  };

  // open camera to select image
  const openCamera = async () => {
    return await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    }).then((image: any) => {
      return onImage(image);
    });
  };

  // open gallery to select image
  const openPicker = async () => {
    return await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    }).then((image: any) => {
      return onImage(image);
    });
  };

  return (
    <>
      {showFabButtons && (
        <TouchableOpacity
          onPress={onHide}
          style={[StyleSheet.absoluteFillObject, styles.fabWrapper]}>
          <Animated.View
            style={[animatedModal, styles.animatedView(right, bottom)]}>
            <TouchableOpacity
              onPress={checkCameraPermission}
              style={styles.fabMenus}>
              <AntDesign name="camera" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={checkGalleryPermission}
              style={styles.fabMenus}>
              <AntDesign name="picture" size={20} />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create<IStyles>({
  fabButton: {
    right: 20,
    bottom: 40,
    elevation: 2,
    position: 'absolute',
    shadowColor: STYLES.SHADOW_COLOR,
    shadowOffset: STYLES.SHADOW_OFFSET,
    shadowOpacity: STYLES.SHADOW_OPACITY,
  },
  imageWrapper: {
    margin: 20,
    elevation: 1,
    borderRadius: 10,
    width: (width - 120) / 3,
    height: (width - 120) / 3,
    shadowColor: STYLES.SHADOW_COLOR,
    backgroundColor: COLORS.BAR_COLOR,
    shadowOffset: STYLES.SHADOW_OFFSET,
    shadowOpacity: STYLES.SHADOW_OPACITY,
  },
  topBar: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  fabMenus: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BAR_COLOR,
  },
  animatedView: (right: number, bottom: number) => ({
    right: right,
    elevation: 2,
    bottom: bottom,
    position: 'absolute',
    shadowOpacity: STYLES.SHADOW_OPACITY,
  }),
  fabWrapper: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default FabView;
