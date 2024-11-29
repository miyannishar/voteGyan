import { FC } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const SPACING = 5;
const ITEM_LENGTH = width * 0.4; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 4;

interface InsightCarouselProps {
  data: Lesson[];
  completedLessons: number[];
  navigation: any;
}

const InsightCarousel: FC<InsightCarouselProps> = ({
  data,
  navigation,
  completedLessons,
}) => {
  const incompleteLessonsToRender = data.filter((lesson) => {
    const found = completedLessons.find((l) => l === lesson.lesson_id);
    return found === null || found === undefined;
  });
  const completeLessonsToRender = data.filter((lesson) => {
    const found = completedLessons.find((l) => l === lesson.lesson_id);
    return found !== null && found !== undefined;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={[...incompleteLessonsToRender, ...completeLessonsToRender]}
        renderItem={({ item, index }) => {
          const found = completedLessons.find((l) => l === item.lesson_id);
          const completed = found !== null && found !== undefined;
          return (
            <TouchableOpacity
              style={[styles.button, completed ? styles.completed : null]}
              onPress={() =>
                navigation.navigate("Lesson", { lesson_id: item.lesson_id })
              }
            >
              <View style={[styles.insightContainer]}>
                <Text style={styles.text}>
                  {completed ? item.steps.length : 0}/{item.steps.length}{" "}
                  complete
                </Text>
                <View style={styles.itemContent}>
                  <View
                    style={[styles.itemImage, { backgroundColor: item.color }]}
                  >
                    <Image
                      source={item.imagePath ? item.imagePath : null}
                      style={styles.overlay}
                    />
                  </View>
                </View>
                <Text style={styles.itemText} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.lesson_id.toString()}
      />
    </View>
  );
};

export default InsightCarousel;

const styles = StyleSheet.create({
  container: {},
  completed: {},
  button: {
    height: 220,
    width: 200,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 4,
    margin: 8,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 8,
  },
  insightContainer: {
    padding: 8,
    borderRadius: 4,
    height: 64,
    textAlign: "right",
    gap: 8,
  },
  text: {
    width: "100%",
    textAlign: "right",
  },
  itemContent: {
    // marginRight: SPACING * 3,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  itemText: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
  },
  itemImage: {
    position: "relative",
    width: "100%",
    height: 140,
    borderRadius: BORDER_RADIUS,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 30,
    width: 120,
    height: 120,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
