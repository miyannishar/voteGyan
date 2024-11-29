import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

interface ActionButtonProps {
  text: string;
  callToActionText: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  head: any;
}

const ActionButton = ({
  text,
  callToActionText = "",
  onPress,
  disabled = false,
  head,
}: ActionButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabledButton : null]}
      onPress={onPress}
      disabled={disabled}
    >
      {head}
      <Text style={styles.buttonText}>{text}</Text>
      <Text style={styles.callToActionText}>{callToActionText}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  button: {
    flex: 1, // Equal width for both views
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  callToActionText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
});
