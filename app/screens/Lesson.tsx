import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import ImageCarousel from "../components/ImageCarousel";
import * as Progress from "react-native-progress";
import CustomButton from "../components/CustomButton";
import LessonConfirmModal from "../components/LessonConfirmModal";
import {
  addCompletedLesson,
  rewardUserPoints,
} from "../../lib/firebase/firestore";
import { allLessons } from "../../utils/utils";
import { mapStringToComponent } from "../components/StringToComponent";
import Markdown from "react-native-markdown-display";

interface RouterProps {
  navigation: NavigationProp<any, any>;
  user: any;
  route: any;
}

const TOTAL_PAGES = 3;

const Insight = ({ navigation, user, route }: RouterProps) => {
  const [step, setStep] = useState(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [lesson, setLesson] = useState<Lesson>(null);

  const lesson_id = route.params.lesson_id;

  const completeLesson = async () => {
    setModalVisible(true);
    await rewardUserPoints(user.uid, 20);
    await addCompletedLesson(user.uid, lesson_id);
  };

  useEffect(() => {
    const lesson = allLessons.find((lesson) => lesson.lesson_id === lesson_id);
    setLesson(lesson);
  }, []);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.exitButton}>
        <Text
          style={styles.exitText}
          onPress={() => navigation.navigate("Home")}
        >
          Exit
        </Text>
      </View>
      <View style={styles.progress}>
        <Progress.Bar
          progress={step / lesson.steps.length}
          width={200}
          height={16}
          color="#2BB1F3"
          borderRadius={8}
          unfilledColor="#EBF4FF"
          borderColor="transparent"
        />
        <Text>
          {step}/{lesson.steps.length}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Image
          source={
            lesson.steps[step - 1].hero ? lesson.steps[step - 1].hero : null
          }
          style={styles.hero}
        />
        <View style={styles.content}>
          <Markdown>{lesson.steps[step - 1].content}</Markdown>
        </View>
        <View style={styles.buttonContainer}>
          {step !== 1 ? (
            <View style={styles.buttonPrev}>
              <CustomButton title="<  Prev" onPress={() => setStep(step - 1)} />
            </View>
          ) : (
            <View></View>
          )}
          {step !== TOTAL_PAGES ? (
            <View style={styles.buttonNext}>
              <CustomButton
                title="Next   >"
                onPress={() => setStep(step + 1)}
              />
            </View>
          ) : (
            <View style={styles.buttonNext}>
              <CustomButton title="Done!" onPress={completeLesson} />
            </View>
          )}
        </View>
      </View>
      <LessonConfirmModal
        visible={modalVisible}
        setVisible={setModalVisible}
        user_id={user.uid}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 16,
    backgroundColor: "white",
  },
  hero: {
    width: "100%",
    height: 200,
  },
  exitButton: {
    position: "absolute",
    top: 56,
    right: 16,
    zIndex: 10,
  },
  exitText: {
    color: "#FF0000",
    fontSize: 18,
    fontWeight: "bold",
  },
  progress: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  contentContainer: {
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 16,
  },
  textContent: {
    gap: 16,
  },
  heading: {
    fontSize: 18,
  },
  strong: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonNext: {
    alignSelf: "flex-end",
  },
  buttonPrev: {
    alignSelf: "flex-start",
  },
});

export default Insight;

const lessonsTemp = [
  <>
    <Text style={styles.heading}>Step 1: Register to Vote What to Do:</Text>
    <View style={styles.textContent}>
      <View>
        <Text style={styles.strong}>Check Eligibility:</Text>
        <Text>
          Ensure you meet the basic requirements: you must be a U.S. citizen, at
          least 18 years old by Election Day, and meet your state’s residency
          requirements.
        </Text>
      </View>
      <View>
        <Text style={styles.strong}>Register:</Text>
        <Text>
          You can register online, by mail, or in person at your local election
          office, DMV, or other designated locations. Each state has its own
          deadlines and procedures.
        </Text>
      </View>
      <View>
        <Text style={styles.strong}>Confirm Registration:</Text>
        <Text>
          Once registered, confirm your registration status online to ensure
          your information is accurate.
        </Text>
      </View>
    </View>
  </>,
  <>
    <Text style={styles.heading}>
      Step 2: Learn About the Candidates and Issues
    </Text>
    <View style={styles.textContent}>
      <View>
        <Text style={styles.strong}>Research:</Text>
        <Text>
          Look up information on the candidates and ballot measures. Use
          non-partisan sources to understand each candidate's positions and the
          pros and cons of each issue.
        </Text>
      </View>
      <View>
        <Text style={styles.strong}>Sample Ballot: </Text>
        <Text>
          Obtain a sample ballot from your local election office or state
          website. This will help you familiarize yourself with what you'll be
          voting on.
        </Text>
      </View>
    </View>
  </>,
  <>
    <Text style={styles.heading}>
      Step 2: Learn About the Candidates and Issues
    </Text>
    <View style={styles.textContent}>
      <View>
        <Text style={styles.strong}>Choose a Method: </Text>
        <Text>
          Decide if you’ll vote in person on Election Day, early in person, or
          by mail (absentee ballot). Check your state’s options and deadlines.
        </Text>
      </View>
      <View>
        <Text style={styles.strong}>In-Person Voting: </Text>
        <Text>
          Find your polling place and check its hours. Bring necessary ID if
          your state requires it.
        </Text>
      </View>
      <View>
        <Text style={styles.strong}>Mail Voting:</Text>
        <Text>
          Request your mail-in ballot early, follow the instructions carefully,
          and mail it back or drop it off at a designated location before the
          deadline.
        </Text>
      </View>
    </View>
  </>,
];
