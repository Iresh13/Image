import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

import GenericText from './text';
import {COLORS} from '../themes/color';

interface IGenericToolbarProps {
  showIcon?: boolean;
  onDelete?: () => void;
  onCancel?: () => void;
}

const GenericToolbar = ({
  showIcon,
  onDelete,
  onCancel,
}: IGenericToolbarProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.imageWrapper}>
        {showIcon ? (
          <TouchableOpacity onPress={onCancel}>
            <GenericText text="Cancel" variation="bold" />
          </TouchableOpacity>
        ) : (
          <Image style={styles.image} source={{uri: 'icon'}} />
        )}
      </View>

      <View style={styles.text}>
        <GenericText text="Your Images" variation="bold" />
      </View>

      <View style={styles.emptyView}>
        {showIcon && (
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name="ios-trash-outline" size={20} color={COLORS.RED} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {flex: 2},
  emptyView: {flex: 0.5},
  imageWrapper: {flex: 1.5},
  image: {height: 20, width: 20},
});

export default GenericToolbar;
