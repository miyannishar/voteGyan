import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Image,
} from "react-native";

interface PointsButtonProps {
  points: number;
  onPress: (event: GestureResponderEvent) => void;
}

const PointsButton = ({ points, onPress }: PointsButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require("../../assets/money-icon.png")}
        style={styles.icon}
      />
      <Text style={styles.buttonText}>{points}</Text>
    </TouchableOpacity>
  );
};

export default PointsButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#34C759",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
});
