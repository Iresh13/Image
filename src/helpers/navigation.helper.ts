import {
  Navigation,
  OptionsLayout,
  NavigationComponentListener,
} from 'react-native-navigation';
import {Dimensions} from 'react-native';

import {COLORS} from '../app/themes/color';

export class CustomNavigation {
  static rootOptions = {
    hardwareBackButton: {
      popStackOnPress: false,
    },
    layout: {
      backgroundCOLORS: COLORS.DIM_GREY,
      componentBackgroundCOLORS: COLORS.DIM_GREY,
    },
    primaryLayout: {
      backgroundCOLORS: COLORS.WHITE,
      componentBackgroundCOLORS: COLORS.WHITE,
    },
  };

  static rootAnimations = {
    animations: {
      push: {
        content: {
          translationX: {
            from: Dimensions.get('window').width,
            to: 0,
            duration: 100,
          },
        },
      },
    },
  };

  static registerComponent = (componentName: string, component: any) => {
    Navigation.registerComponent(componentName, component);
  };

  static register = (
    listener: NavigationComponentListener,
    componentId: string,
  ) => {
    return Navigation.events().registerComponentListener(listener, componentId);
  };

  static push = (
    componentId: string,
    name: string,
    props?: Record<string, unknown>,
  ) => {
    return Navigation.push(componentId, {
      component: {
        name,
        passProps: props,
      },
    });
  };

  static pop = (componentId: string) => {
    return Navigation.pop(componentId);
  };

  static dismissModal = (componentId: string) => {
    return Navigation.dismissModal(componentId);
  };

  static registerComponentDidAppear = (paramFunction: () => void) => {
    return Navigation.events().registerComponentDidAppearListener(
      paramFunction,
    );
  };

  static registerAppLaunched = (paramFunction: () => void) => {
    return Navigation.events().registerAppLaunchedListener(paramFunction);
  };

  static setRoot = (name: string, props?: Record<string, unknown>) => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name,
                passProps: props,
              },
            },
          ],
        },
      },
    });
  };

  static showModal = (name: string, props?: Record<string, unknown>) => {
    return Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name,
              passProps: props,
              options: {
                layout: this.rootOptions.primaryLayout as OptionsLayout,
              },
            },
          },
        ],
      },
    });
  };

  static setDefaultOptions = () => {
    return Navigation.setDefaultOptions({
      topBar: {
        visible: false,
      },
      layout: {
        orientation: ['portrait'],
        backgroundColor: COLORS.BACKGROUND_COLOR,
        componentBackgroundColor: COLORS.BACKGROUND_COLOR,
      },

      animations: {
        setRoot: {
          alpha: {
            from: 0,
            to: 1,
            duration: 300,
          },
          translationX: {
            from: 0,
            to: 1,
            duration: 300,
          },
        },
      },
    });
  };
}
