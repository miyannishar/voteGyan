import { View, Image, StyleSheet } from "react-native";
import { accessoryImageMap } from "../../utils/accessories";

interface AvatarOverlayProps {
  selectedAccessories: Accessory[];
  avatarUrl: any;
}

const AvatarOverlay = ({
  selectedAccessories,
  avatarUrl,
}: AvatarOverlayProps) => {
  return (
    <View style={styles.container}>
      <Image source={avatarUrl} style={styles.avatarImage} />
      {selectedAccessories.map((selectedAccessory) => {
        if (selectedAccessory === null) return;
        return (
          <Image
            source={accessoryImageMap[selectedAccessory.overlayUrl]}
            key={selectedAccessory.accessory_id}
            style={styles[selectedAccessory.type]}
          />
        );
      })}
    </View>
  );
};

export default AvatarOverlay;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    width: 340,
    height: 340,
    alignContent: "center",
    zIndex: 5,
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  avatarImage: {
    position: "relative",
    width: "100%",
    height: 350,
    objectFit: "contain",
    zIndex: 5,
  },
  Body: {
    zIndex: 7,
    position: "absolute",
    width: 153,
    height: 69,
    top: 217,
    left: 95,
  },
  Headwear: {
    zIndex: 7,
    position: "absolute",
    width: 200,
    height: 200,
    top: -50,
    left: 70,
  },
  Righthand: {
    zIndex: 7,
    position: "absolute",
    width: 75,
    height: 75,
    bottom: 80,
    right: 20,
  },
  Bag: {
    zIndex: 7,
    position: "absolute",
    width: 75,
    height: 75,
    bottom: 60,
    right: 60,
  },
  Headpin: {
    zIndex: 7,
    position: "absolute",
    width: 35,
    height: 35,
    top: 60,
    right: 60,
  },
});
