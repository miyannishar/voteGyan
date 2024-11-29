import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Modal,
  View,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import ChallengeQuestion from "./ChallengeQuestion";
import {
  addLastCompletedChallengeDate,
  incrementDailyStreak,
  rewardUserPoints,
} from "../../lib/firebase/firestore";

interface RedeemConfirmModalProps {
  visible: boolean;
  setVisible: any;
  user_id: string;
  navigation: any;
}

const allAnswerOptions: MultipleChoices[] = ["A", "B", "C", "D"];

const RedeemConfirmModal = ({
  visible = true,
  setVisible,
  user_id,
  navigation,
}: RedeemConfirmModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
      style={styles.modal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text onPress={() => setVisible(false)}>X</Text>
          </View>
          <View style={styles.head}>
            <Image
              source={require("../../assets/confetti.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Success!</Text>
          </View>
          <View style={styles.spacing}>
            <View>
              <Text>Looking good!</Text>
              <Text>Your prize has been redeemed.</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setVisible(false);
                navigation.navigate("Profile");
              }}
            >
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RedeemConfirmModal;

const styles = StyleSheet.create({
  modal: {
    zIndex: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  logo: {
    width: 32,
    height: 32,
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  spacing: {
    gap: 16,
  },
  title: {
    fontSize: 24,
  },
  content: {
    gap: 16,
  },
  options: {
    gap: 16,
  },
  question: {},
  button: {
    width: "50%",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginHorizontal: "auto",
  },
  bold: {
    fontWeight: "bold",
  },
  money: {
    color: "green",
  },
  icon: {
    width: 20,
    height: 20,
  },
  buttonClose: {
    backgroundColor: "#007AFF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
