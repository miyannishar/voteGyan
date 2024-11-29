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

interface DailyChallengeModalProps {
  visible: boolean;
  setVisible: any;
  user_id: string;
}

const allAnswerOptions: MultipleChoices[] = ["A", "B", "C", "D"];

const DailyChallengeModal = ({
  visible = true,
  setVisible,
  user_id,
}: DailyChallengeModalProps) => {
  const [data, setData] = useState<Question>(null);
  const [loading, setLoading] = useState(true);

  const [wrongAnswerIndexs, setWrongAnswerIndexs] = useState<number[]>([]);
  const [correct, setCorrect] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/question/0")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  async function verifyAnswer(attemptedAnswer: MultipleChoices, index: number) {
    const correctAnswer = data?.correct_answer.replaceAll(/\s/g, "");
    if (attemptedAnswer === correctAnswer) {
      setCorrect(true);
      setVisible(true);
      await rewardUserPoints(user_id, 20);
      await incrementDailyStreak(user_id);
      await addLastCompletedChallengeDate(user_id);
      return;
    } else {
      setWrongAnswerIndexs((prev) => [...prev, index]);
      setCorrect(false);
    }
  }

  if (!data || loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
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
              source={require("../../assets/reward.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Daily Challenge</Text>
          </View>
          {correct ? (
            <View style={styles.spacing}>
              <View>
                <Text>Yay, you are correct!</Text>
                <Text>
                  You earned: <Text style={styles.money}>+20 💵</Text>
                </Text>
              </View>
              <Text style={styles.bold}>Correct Answer:</Text>
              <Text style={styles.green}>{data.explanation}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Go back!</Text>
              </TouchableOpacity>
            </View>
          ) : wrongAnswerIndexs.length > 1 ? (
            <View style={styles.spacing}>
              <View>
                <Text>Sorry, try again tomorrow!</Text>
              </View>
              <Text style={styles.bold}>Correct Answer:</Text>
              <Text style={styles.green}>{data.explanation}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Go back!</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.content}>
              {wrongAnswerIndexs.length === 1 && (
                <Text style={styles.wrong}>One more try!!</Text>
              )}
              <Text style={styles.question}>{data.question}</Text>
              <View style={styles.options}>
                {allAnswerOptions.map((option, index) => (
                  <ChallengeQuestion
                    key={option}
                    title={data[option]}
                    onPress={() => verifyAnswer(option, index)}
                    disabled={!!wrongAnswerIndexs?.find((i) => i === index)}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default DailyChallengeModal;

const styles = StyleSheet.create({
  modal: {
    zIndex: 100,
    backgroundColor: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    flexDirection: "row",
    gap: 8,
  },
  logo: {
    width: 36,
    height: 36,
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
    marginBottom: 16,
  },
  content: {
    gap: 16,
  },
  options: {
    gap: 16,
  },
  question: {},
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  wrong: {
    color: "#FF0000",
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
  green: {
    backgroundColor: "#34C75925",
    padding: 4,
  },
});
