import {
  SafeAreaView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { getUser } from "../../lib/firebase/firestore";
import { insights, insights2, insights3, isToday } from "../../utils/utils";
import PointsButton from "../components/PointsButton";
import ActionButton from "../components/ActionButton";
import DailyChallengeModal from "../components/DailyChallengeModal";
import { doc, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../lib/firebase/firebase";
import InsightCarousel from "../components/InsightCarousel";

interface RouterProps {
  navigation: NavigationProp<any, any>;
  user: any;
}

const Home = ({ navigation, user: secureUser }: RouterProps) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Daily Challenge States
   */
  const [dailyChallengeModalVisible, setDailyChallengeModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const getDocument = async () => {
      try {
        setLoading(true);
        const currentUser = (await getUser(secureUser.uid)) as User;
        setUser(currentUser);
        setLoading(false);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getDocument();
  }, [secureUser]);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(FIRESTORE_DB, "users", secureUser.uid),
      (doc) => {
        const newData = doc.data() as User;
        setUser(newData);
      }
    );

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const challengeButtonDisabled = isToday(user?.last_completed_challenge_date);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerInfo}>
          <View style={styles.head}>
            <Text style={styles.appName}>voteGyan</Text>
            <Image
              source={require("../../assets/logo4.png")}
              style={styles.logo}
            />
          </View>
          <View>
            <Text style={styles.headerText}>Hi {user.name}!</Text>
            <Text style={styles.headerText}>We're glad you're here.</Text>
          </View>
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.profileButton}
          >
            <Image
              source={require("../../assets/profile.png")}
              style={styles.avatarImage}
            />
            <Text style={{ fontWeight: "bold" }}>Go to Profile</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <PointsButton
              points={user.points}
              onPress={() => navigation.navigate("Redeem")}
            />
            <Text style={[styles.streak, { marginTop: 4 }]}>
              🔥 {user.num_daily_streak} day streak
            </Text>
          </View>
        </View>
        <View style={styles.actionBar}>
          <ActionButton
            text="The Daily Challenge"
            callToActionText={
              challengeButtonDisabled ? "✓ Completed" : "Play Now"
            }
            head={
              <View style={styles.view}>
                <Image
                  source={require("../../assets/reward.png")}
                  style={styles.viewImage}
                />
              </View>
            }
            onPress={() => setDailyChallengeModalVisible(true)}
            disabled={challengeButtonDisabled}
          />
          <ActionButton
            text="Until voting ends"
            callToActionText="View more info"
            head={
              <View>
                <Text style={styles.importantText}>140 Days</Text>
              </View>
            }
            onPress={() => void 0}
          />
        </View>
        <View style={styles.insights}>
          <Text style={styles.title}>Insights</Text>
          <Text>Voting 101</Text>
          <InsightCarousel
            data={insights}
            navigation={navigation}
            completedLessons={user.lessonsCompleted}
          />
          <Text>The Senate</Text>
          <InsightCarousel
            data={insights2}
            navigation={navigation}
            completedLessons={user.lessonsCompleted}
          />
          <Text>The Electoral College</Text>
          <InsightCarousel
            data={insights3}
            navigation={navigation}
            completedLessons={user.lessonsCompleted}
          />
        </View>
        <DailyChallengeModal
          visible={dailyChallengeModalVisible}
          setVisible={setDailyChallengeModalVisible}
          user_id={user.user_id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  importantText: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  view: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  viewImage: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#EBF4FF", // Off-white color
    gap: 16,
    paddingVertical: 16,
  },
  pointButton: {
    position: "absolute",
    top: 60,
    right: 16,
    zIndex: 10,
  },
  profileButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarImage: {
    width: 44,
    height: 44,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 40,
    paddingHorizontal: 16,
  },
  headerContent: {
    flex: 1,
    alignItems: "flex-end",
    gap: 4,
  },
  streak: {
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 24,
  },
  headerInfo: {
    marginTop: 50,
    gap: 8,
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  logo: {
    width: 20,
    height: 20,
  },
  appName: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    zIndex: 10,
    paddingHorizontal: 16,
  },
  insights: {
    backgroundColor: "white",
    gap: 8,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 350,
    resizeMode: "contain", // To ensure the image scales nicely
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap", // Enable wrapping of items
    gap: 16,
    justifyContent: "center",
    backgroundColor: "#FFFDEE", // Off-white color
    padding: 10,
  },
});

export default Home;
