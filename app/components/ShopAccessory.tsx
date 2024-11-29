import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { accessoryImageMap } from "../../utils/accessories";

interface ShopAccessoryProps {
  accessory: Accessory;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  selected: boolean;
}

const ShopAccessory = ({
  accessory,
  onPress,
  disabled,
  selected,
}: ShopAccessoryProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        selected ? styles.selected : null,
        disabled ? styles.disabled : null,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <View style={styles.container}>
        <View
          style={[styles.check, selected ? styles.checkSelected : null]}
        ></View>
        <Image
          source={accessoryImageMap[accessory.previewUrl]}
          style={styles.shopAccessoryImage}
        />
        <View style={styles.priceContainer}>
          <Image
            source={require("../../assets/money-black.png")}
            style={styles.moneyIcon}
          />
          <Text style={styles.price}>{accessory.cost}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopAccessory;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 8,
  },
  container: {
    width: 78,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  costContainer: {
    position: "absolute",
    backgroundColor: "blue",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    top: -8,
    right: -8,
    zIndex: 10,
  },
  cost: {
    color: "white",
  },
  shopAccessoryImage: {
    width: 70,
    height: 70,
    objectFit: "contain",
  },
  title: {
    paddingTop: 8,
  },
  check: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 200,
    zIndex: 100,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D8D8DC",
  },
  checkSelected: {
    backgroundColor: "#34C759",
  },
  selected: {
    borderColor: "green",
    borderWidth: 0.2,
    borderStyle: "solid",
  },
  disabled: {
    opacity: 0.4,
  },
  priceContainer: {
    flexDirection: "row",
    gap: 4,
  },
  price: {
    fontWeight: "bold",
  },
  moneyIcon: {
    width: 16,
    height: 16,
  },
});
