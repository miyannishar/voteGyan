import { FC } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const SPACING = 5;
const ITEM_LENGTH = width * 0.8; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 20;

interface ImageCarouselProps {
  data: ImageCarouselItem[];
}

const ImageCarousel: FC<ImageCarouselProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: ITEM_LENGTH }}>
              <View style={styles.itemContent}>
                <Image source={{ uri: item.uri }} style={styles.itemImage} />
                <Text style={styles.itemText} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            </View>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {},
  itemContent: {
    marginHorizontal: SPACING * 3,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  itemText: {
    fontSize: 24,
    position: "absolute",
    bottom: SPACING * 2,
    right: SPACING * 2,
    color: "white",
    fontWeight: "600",
  },
  itemImage: {
    width: "100%",
    height: ITEM_LENGTH,
    borderRadius: BORDER_RADIUS,
    resizeMode: "cover",
  },
});
