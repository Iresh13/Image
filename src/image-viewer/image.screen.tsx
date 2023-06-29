import {
  Modal,
  FlatList,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Alert from '../app/ui/alert';
import FabView from '../app/ui/fab';
import {COLORS} from '../app/themes/color';
import {STYLES} from '../app/themes/styles';
import GenericButton from '../app/ui/button';
import {APP_SCREENS} from '../app/app.screens';
import GenericToolbar from '../app/ui/toolbar';
import {IImage, IReducerState, IStyles, TDispatch} from '../app/app.types';

import ImageComponent from './image.component';
import {CustomNavigation} from '../helpers/navigation.helper';

import {updateImages} from '../redux/redux.action';
import GenericText from '../app/ui/text';

interface IProps {
  componentId: string;
}

const {width} = Dimensions.get('screen');

const ImageView = ({componentId}: IProps) => {
  const dispatch: TDispatch = useDispatch();
  const images = useSelector((state: IReducerState) => state.app);

  const rotation = useSharedValue('0rad');

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFabButtons, setShowFabButtons] = useState<boolean>(false);

  const animatedPlus = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: rotation.value,
        },
      ],
    };
  }, []);

  useEffect(() => {
    if (showFabButtons) {
      return animateView();
    }

    return hideView();
  }, [showFabButtons]);

  const animateView = () => {
    rotation.value = withTiming('45rad', {
      duration: 50,
      easing: Easing.linear,
    });
  };

  const hideView = () => {
    rotation.value = withTiming('0rad', {
      duration: 50,
      easing: Easing.linear,
    });
  };

  const onImage = async (image: IImage) => {
    image.id = images.length + 1;
    image.isSelected = false;

    const newImageArray = [...images, image];

    dispatch(updateImages(newImageArray));
    setShowFabButtons(false);
  };

  const onDelete = (image: IImage) => {
    const newImages: IImage[] = images.filter((item: IImage) => {
      return item.id !== image.id;
    });

    if (newImages) {
      return dispatch(updateImages(newImages));
    }
  };

  const onDeleteImages = () => {
    const newImages: IImage[] = images.filter((item: IImage) => {
      return item.isSelected === false;
    });

    setShowMenu(false);
    setShowModal(false);

    if (newImages) {
      return dispatch(updateImages(newImages));
    }
  };

  const mapSelectedImages = (image: IImage) => {
    const newImages = images.map((item: IImage) => {
      if (image.id === item.id) {
        item.isSelected = !item.isSelected;
      }

      return item;
    });

    dispatch(updateImages(newImages));
  };

  const cancelSelectedImages = () => {
    const newImages = images.map((item: IImage) => {
      item.isSelected = false;

      return item;
    });

    dispatch(updateImages(newImages));
  };

  const onSelectionCancelled = () => {
    setShowMenu(false);
    cancelSelectedImages();
  };

  const onImagePressed = (item: IImage) => {
    if (showMenu) {
      return mapSelectedImages(item);
    }

    CustomNavigation.showModal(APP_SCREENS.IMAGE_VIEWER, {
      image: item,
      componentId: componentId,
      onDelete: (image: IImage) => onDelete(image),
    });
  };

  return (
    <SafeAreaView style={styles.main}>
      <GenericToolbar
        showIcon={showMenu}
        onDelete={() => setShowModal(true)}
        onCancel={onSelectionCancelled}
      />

      {images.length >= 0 ? (
        <View style={styles.centerView}>
          <GenericText text="No Photos" variation="bold large" />
        </View>
      ) : (
        <FlatList
          data={images}
          numColumns={3}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          keyExtractor={index => index.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => onImagePressed(item)}
                onLongPress={() => {
                  setShowMenu(true);
                  mapSelectedImages(item);
                }}
                style={styles.imageWrapper}>
                <ImageComponent image={item} />
              </TouchableOpacity>
            );
          }}
        />
      )}
      <FabView
        rightValue={20}
        bottomValue={40}
        animatedRightValue={40}
        animatedBottomValue={150}
        showFabButtons={showFabButtons}
        onImage={(image: IImage) => onImage(image)}
        onHide={() => setShowFabButtons(!showFabButtons)}
      />

      <GenericButton
        variation="fab"
        onButtonPressed={() => setShowFabButtons(!showFabButtons)}
        style={styles.fabButton}>
        <Animated.View style={animatedPlus}>
          <AntDesign name="plus" size={20} color={COLORS.WHITE} />
        </Animated.View>
      </GenericButton>

      <Modal transparent visible={showModal}>
        <Alert
          modalHeight={320}
          title="Delete Image"
          onSubmit={onDeleteImages}
          description="Do you want to delete these image?"
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </SafeAreaView>
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
  centerView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default ImageView;
