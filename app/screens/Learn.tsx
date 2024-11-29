import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import ImageCarousel from "../components/ImageCarousel";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

// Sample data for the carousel
const data: ImageCarouselItem[] = [
  {
    id: 0,
    uri: "https://images.unsplash.com/photo-1607326957431-29d25d2b386f",
    title: "Dahlia",
  }, // https://unsplash.com/photos/Jup6QMQdLnM
  {
    id: 1,
    uri: "https://images.unsplash.com/photo-1512238701577-f182d9ef8af7",
    title: "Sunflower",
  }, // https://unsplash.com/photos/oO62CP-g1EA
  {
    id: 2,
    uri: "https://images.unsplash.com/photo-1627522460108-215683bdc9f6",
    title: "Zinnia",
  }, // https://unsplash.com/photos/gKMmJEvcyA8
  {
    id: 3,
    uri: "https://images.unsplash.com/photo-1587814213271-7a6625b76c33",
    title: "Tulip",
  }, // https://unsplash.com/photos/N7zBDF1r7PM
  {
    id: 4,
    uri: "https://images.unsplash.com/photo-1588628566587-dbd176de94b4",
    title: "Chrysanthemum",
  }, // https://unsplash.com/photos/GsGZJMK0bJc
  {
    id: 5,
    uri: "https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e",
    title: "Hydrangea",
  }, // https://unsplash.com/photos/coIBOiWBPjk
];

const { width } = Dimensions.get("window");

const CarouselItem = ({ item }) => (
  <View style={styles.item}>
    {/* Render your carousel item content here */}
    <Text>{item.title}</Text>
  </View>
);

const Learn = ({ navigation }: RouterProps) => {
  const [index, setIndex] = useState(0);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setIndex(index);
  };

  return (
    <View>
      <Text>Learning! Wow</Text>
      <ImageCarousel data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: 64,
    height: 300, // Adjust the height as per your requirements
  },
});

export default Learn;
