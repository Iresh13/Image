import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';

import GenericText from './src/app/ui/text';
import {APP_SCREENS} from './src/app/app.screens';
import {CustomNavigation} from './src/helpers/navigation.helper';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      CustomNavigation.setRoot(APP_SCREENS.IMAGE_VIEW);
    }, 300);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <Image style={styles.image} source={{uri: 'icon'}} />
      <GenericText text="Image Viewer" variation="regular" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {height: 100, width: 100, marginBottom: 10},
});

export default App;
