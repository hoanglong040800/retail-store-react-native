import { Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  icon: string;
  name: string;
  size?: 'S' | 'M';
  isHighlighted?: boolean;

  onPress: () => void;
};

const CategoryItem = ({ icon, name, size = 'M', isHighlighted, onPress = () => null }: Props) => {
  const dynamicImgStyle: StyleProp<ImageStyle> = {
    opacity: isHighlighted === false ? 0.5 : 1,
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: icon }} style={[styles[`image${size}`], dynamicImgStyle]} />

        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
  },

  imageS: {
    width: 50,
    height: 50,
  },

  imageM: {
    width: 100,
    height: 100,
  },

  text: {
    marginTop: 4,
  },
});

export default CategoryItem;
