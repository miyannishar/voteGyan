import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../lib/firebase/firebase";
import { getUser } from "../../lib/firebase/firestore";
import AvatarOverlay from "../components/AvatarOverlay";
import CustomButton from "../components/CustomButton";
import PointsButton from "../components/PointsButton";
import * as Progress from "react-native-progress";
import IconButton from "../components/IconButton";
import { doc, onSnapshot } from "firebase/firestore";

interface RouterProps {
  navigation: NavigationProp<any, any>;
  user: any;
}

const Profile = ({ navigation, user: secureUser }: RouterProps) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <View style={styles.container}>
      <View style={styles.filler} />
      <View style={styles.head}>
        <Text style={styles.title}>Politicool</Text>
        <Image
          source={require("../../assets/eyeglasses.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.goBack} onPress={() => navigation.navigate("Home")}>
        {"< Go Back"}
      </Text>
      <Text style={styles.logout} onPress={() => FIREBASE_AUTH.signOut()}>
        Logout
      </Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi {user.name}, you are a</Text>
        <Text style={[styles.headerText, styles.bold]}>Beginner Learner</Text>
      </View>
      <AvatarOverlay
        selectedAccessories={user.accessories}
        avatarUrl={require("../../assets/avatar.png")}
      />
      <View style={styles.information}>
        <PointsButton points={user.points} onPress={() => void 0} />
        <Text style={styles.streak}>🔥 {user.num_daily_streak} day streak</Text>
      </View>
      <View style={styles.progress}>
        <Progress.Bar
          progress={(user.lessonsCompleted?.length || 0) / 10}
          width={190}
          height={16}
          color="#2BB1F3"
          borderRadius={8}
          unfilledColor="#EBF4FF"
          borderColor="transparent"
        />
        <Text style={styles.progressText}>
          {user.lessonsCompleted?.length || 0}/10 lessons completed
        </Text>
      </View>
      <Text style={styles.nextLevel}>next up Level 2: Big Brainer</Text>
      <View style={styles.buttons}>
        <IconButton
          text="Redeem for Prize"
          iconUrl={require("../../assets/cart-sale.png")}
          onPress={() => navigation.navigate("Redeem")}
        />
      </View>

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  filler: {
    position: "absolute",
    top: -60,
    width: "120%",
    height: 60,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginTop: 60,
    padding: 16,
    alignItems: "center",
    gap: 8,
    zIndex: 11,
    backgroundColor: "white",
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
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  bold: {
    fontWeight: "bold",
  },
  goBackContainer: {
    width: "100%",
    alignItems: "flex-start",
    fontWeight: "bold",
    zIndex: 111,
  },
  header: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 24,
  },
  headerText: {
    fontSize: 24,
  },
  buttons: {
    flexDirection: "row",
    zIndex: 10011,
    gap: 16,
    width: "60%",
    marginTop: 8,
  },
  information: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
  },
  streak: {
    fontWeight: "bold",
  },
  progress: {
    flexDirection: "row",
    gap: 8,
  },
  progressText: {
    fontWeight: "bold",
  },
  nextLevel: {
    width: "100%",
    textAlign: "right",
  },
  logout: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "bold",
    top: 14,
    right: 16,
    color: "#FF0000"
  },
  goBack: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "bold",
    top: 14,
    left: 16,
    color: "#2BB1F3"
  }
});
