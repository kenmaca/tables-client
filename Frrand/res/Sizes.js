import {
  Dimensions
} from 'react-native';

export const Sizes = {

  // screen
  Width: Dimensions.get('window').width,
  Height: Dimensions.get('window').height,

  // text
  H1: 24,
  H2: 21,
  H3: 14,
  Text: 12,
  SmallText: 8,

  // weights
  Bold: '600',
  Light: '100',

  // padding
  OuterFrame: 25,
  InnerFrame: 15,

  // decor
  RoundedBorders: 5
};

export default Sizes;
