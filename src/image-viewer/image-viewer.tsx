import {
  View,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import FabView from '../app/ui/fab';
import GenericAlert from '../app/ui/alert';
import {COLORS} from '../app/themes/color';
import {STYLES} from '../app/themes/styles';
import GenericButton from '../app/ui/button';
import {IImage, IReducerState, IStyles, TDispatch} from '../app/app.types';

import {updateImages} from '../redux/redux.action';
import {CustomNavigation} from '../helpers/navigation.helper';
import {APP} from '../app/app.constant';

interface IImageProps {
  image: IImage;
  componentId: string;
  onDelete: (image: IImage) => void;
}

const ImageViewer = ({image, onDelete, componentId}: IImageProps) => {
  const dispatch: TDispatch = useDispatch();
  const images = useSelector((state: IReducerState) => state.app);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const translationY = useSharedValue(0);
  const savedTranslationY = useSharedValue(0);

  const translationX = useSharedValue(0);
  const savedTranslationX = useSharedValue(0);

  const [selectedImage, setSelectedImage] = useState<IImage>(image);

  const [showFabButtons, setShowFabButtons] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translationX.value = savedTranslationX.value + e.translationX;
      translationY.value = savedTranslationY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslationX.value = translationX.value;
      savedTranslationY.value = translationY.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translationX.value},
      {translateY: translationY.value},
    ],
  }));

  const onUpdateImage = (newImage: IImage) => {
    newImage.id = image.id;

    const newImages = images.map((item: IImage) => {
      if (item.id === newImage.id) {
        item = newImage;
      }

      return item;
    });

    dispatch(updateImages(newImages));

    setSelectedImage(newImage);
  };

  const deleteImage = () => {
    setShowModal(false);
    CustomNavigation.dismissModal(componentId);

    onDelete(image);
  };

  return (
    <View style={styles.main}>
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={() => CustomNavigation.dismissModal(componentId)}>
          <Feather name="chevron-left" size={20} color={COLORS.BLACK} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Ionicons name="ios-trash-outline" size={20} color={COLORS.RED} />
        </TouchableOpacity>
      </View>

      <GestureDetector gesture={pinchGesture}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[animatedStyle]}>
            <Image
              style={styles.imageView}
              source={{
                uri:
                  Platform.OS === APP.IOS
                    ? selectedImage.sourceURL
                    : selectedImage.path,
              }}
            />
          </Animated.View>
        </GestureDetector>
      </GestureDetector>

      <FabView
        rightValue={20}
        bottomValue={40}
        animatedRightValue={40}
        onImage={onUpdateImage}
        animatedBottomValue={150}
        showFabButtons={showFabButtons}
        onHide={() => setShowFabButtons(!showFabButtons)}
      />

      <GenericButton
        variation="fab"
        onButtonPressed={() => setShowFabButtons(true)}
        style={styles.fabButton}>
        <Feather name="edit" size={20} color={COLORS.WHITE} />
      </GenericButton>

      <Modal transparent visible={showModal}>
        <GenericAlert
          modalHeight={320}
          title="Delete Image"
          description="Do you want to delete this images?"
          onCancel={() => setShowModal(false)}
          onSubmit={deleteImage}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create<IStyles>({
  main: {flex: 1, backgroundColor: COLORS.WHITE},
  imageView: {
    marginTop: 30,
    borderRadius: 10,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  fabButton: {
    zIndex: 999,
    right: 20,
    bottom: 180,
    elevation: 2,
    position: 'absolute',
    shadowColor: STYLES.SHADOW_COLOR,
    shadowOffset: STYLES.SHADOW_OFFSET,
    shadowOpacity: STYLES.SHADOW_OPACITY,
  },
  topRow: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    shadowColor: STYLES.SHADOW_COLOR,
    shadowOpacity: STYLES.SHADOW_OPACITY,
  },
});

export default ImageViewer;
