import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import {
  addLastCompletedChallengeDate,
  incrementDailyStreak,
  rewardUserPoints,
} from "../../lib/firebase/firestore";
import ChallengeQuestion from "../components/ChallengeQuestion";

interface RouterProps {
  navigation: NavigationProp<any, any>;
  user: any;
}

const allAnswerOptions: MultipleChoices[] = ["A", "B", "C", "D"];

const Challenge = ({ navigation, user }: RouterProps) => {
  const [data, setData] = useState<Question>(null);
  const [loading, setLoading] = useState(true);

  /**
   * States for verifying answers
   */
  const [wrongAnswerIndexs, setWrongAnswerIndexs] = useState<number[]>([]);
  const [correct, setCorrect] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/question/2")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  async function verifyAnswer(attemptedAnswer: MultipleChoices, index: number) {
    const correctAnswer = data?.correct_answer.replaceAll(/\s/g, "");
    if (attemptedAnswer === correctAnswer) {
      setCorrect(true);
      setModalVisible(true);
      const userId = user.uid;
      await rewardUserPoints(userId, 10);
      await incrementDailyStreak(userId);
      //   await addLastCompletedChallengeDate(userId);
      return;
    } else {
      setWrongAnswerIndexs((prev) => [...prev, index]);
      setCorrect(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.question}</Text>
      <View style={styles.choices}>
        {allAnswerOptions.map((option, index) => (
          <ChallengeQuestion
            key={option}
            title={data[option]}
            onPress={() => verifyAnswer(option, index)}
            disabled={!!wrongAnswerIndexs?.find((i) => i === index)}
          />
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Yay you got the right answer!</Text>
            <View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  navigation.navigate("Learn");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>
                  Learn more at the learn page
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                navigation.navigate("Home");
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Go back to home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View>{correct && <Text>{data.explanation}</Text>}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  choices: {
    marginTop: 16,
    gap: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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

export default Challenge;
