import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import ImageView from '../image-viewer/image.screen';
import ImageViewer from '../image-viewer/image-viewer';

import App from '../../App';
import {APP_SCREENS} from './app.screens';
import {ReduxProvider} from '../redux/redux.store';

export default function registerScreen() {
  Navigation.registerComponent(
    APP_SCREENS.APP,
    () => ReduxProvider(gestureHandlerRootHOC(App as any)),
    () => gestureHandlerRootHOC(App as any),
  );

  Navigation.registerComponent(
    APP_SCREENS.IMAGE_VIEW,
    () => ReduxProvider(gestureHandlerRootHOC(ImageView as any)),
    () => gestureHandlerRootHOC(ImageView as any),
  );

  Navigation.registerComponent(
    APP_SCREENS.IMAGE_VIEWER,
    () => ReduxProvider(gestureHandlerRootHOC(ImageViewer as any)),
    () => gestureHandlerRootHOC(ImageViewer as any),
  );
}
