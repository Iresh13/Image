import App from './App';
import registerScreen from './src/app/app.registry';
import {APP_SCREENS} from './src/app/app.screens';
import {CustomNavigation} from './src/helpers/navigation.helper';
import {ReduxProvider} from './src/redux/redux.store';

import {Navigation} from 'react-native-navigation';

registerScreen();

CustomNavigation.setDefaultOptions();
CustomNavigation.registerAppLaunched(() => {
  CustomNavigation.setRoot(APP_SCREENS.APP);
});
