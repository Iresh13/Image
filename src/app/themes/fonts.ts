import {PixelRatio} from 'react-native';

const PIXEL_RATIO = PixelRatio.getFontScale();

export const FONTS = {
  SMALL_FONT_SIZE: PIXEL_RATIO >= 3 ? 14 : 12,
  MEDIUM_FONT_SIZE: PIXEL_RATIO >= 3 ? 16 : 14,
  TERTIARY_FONT_SIZE: PIXEL_RATIO >= 3 ? 18 : 16,
  PRIMARY_FONT_SIZE: PIXEL_RATIO >= 3 ? 22 : 20,
  SECONDARY_FONT_SIZE: PIXEL_RATIO >= 3 ? 20 : 18,
  EXTRA_SMALL_FONT_SIZE: PIXEL_RATIO >= 3 ? 12 : 10,
};
