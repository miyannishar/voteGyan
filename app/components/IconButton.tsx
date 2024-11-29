import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Image,
} from "react-native";

interface IconButtonProps {
  text: string;
  iconUrl?: any;
  onPress: (event: GestureResponderEvent) => void;
  additionalStyle?: any;
  disabled?: boolean;
}

const IconButton = ({
  text,
  iconUrl,
  onPress,
  additionalStyle,
  disabled,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.disabled : null,
        additionalStyle,
      ]}
      disabled={disabled}
      onPress={disabled ? () => void 0 : onPress}
    >
      {iconUrl && <Image source={iconUrl} style={styles.icon} />}
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  icon: {
    width: 24,
    height: 24,
  },
  disabled: {
    opacity: 0.4,
  },
});
