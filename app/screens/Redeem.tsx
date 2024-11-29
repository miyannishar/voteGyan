import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import ShopAccessory from "../components/ShopAccessory";
import { redeemAccessoryForPoints } from "../../utils/core";
import { getUser } from "../../lib/firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../lib/firebase/firebase";
import AvatarOverlay from "../components/AvatarOverlay";
import CustomButton from "../components/CustomButton";
import PointsButton from "../components/PointsButton";
import IconButton from "../components/IconButton";
import RedeemConfirmModal from "../components/RedeemConfirmModal";
import { shopAccessories } from "../../utils/accessories";

interface RouterProps {
  navigation: NavigationProp<any, any>;
  user: any;
}

const Redeem = ({ navigation, user: secureUser }: RouterProps) => {
  const [user, setUser] = useState<User>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const getDocument = async () => {
      try {
        setUserLoading(true);
        const currentUser = (await getUser(secureUser.uid)) as User;
        setUser(currentUser);
        setUserLoading(false);
      } catch (e) {
        console.error(e);
      } finally {
        setUserLoading(false);
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

  const [loading, setLoading] = useState<boolean>(false);

  const purchaseAccessory = async (accessory: Accessory) => {
    try {
      setLoading(true);
      await redeemAccessoryForPoints(user.user_id, accessory);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const confirmPurchase = () => {
    purchaseAccessory(shopAccessories[selectedIndex]);
    setSelectedIndex(null);
    setModalVisible(true);
  };

  if (userLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <RedeemConfirmModal
        visible={modalVisible}
        setVisible={setModalVisible}
        navigation={navigation}
        user_id={user.user_id}
      />
      <View style={styles.container}>
        <View style={styles.bg}></View>
        <View style={styles.head}>
          <Text style={styles.title}>Politicool</Text>
          <Image
            source={require("../../assets/eyeglasses.png")}
            style={styles.logo}
          />
        </View>
        <AvatarOverlay
          selectedAccessories={[
            selectedIndex !== undefined && selectedIndex !== null
              ? shopAccessories[selectedIndex]
              : null,
          ]}
          avatarUrl={require("../../assets/avatar-white-bg.png")}
        />
        <View style={styles.info}>
          <Text style={[styles.mainText, styles.bold]}>Redeem Prize</Text>
          <PointsButton points={user.points} onPress={() => void 0} />
        </View>
        <View style={styles.shopAccessoriesContainer}>
          {shopAccessories.map((shopAccessory, index) => (
            <ShopAccessory
              key={shopAccessory.accessory_id}
              accessory={shopAccessory}
              onPress={() =>
                selectedIndex === index
                  ? setSelectedIndex(null)
                  : setSelectedIndex(index)
              }
              selected={index === selectedIndex}
              disabled={
                !!user.accessories.find(
                  (v) => v.accessory_id === shopAccessory.accessory_id
                ) || shopAccessory.cost > user.points
              }
            />
          ))}
        </View>
        <View style={styles.buttons}>
          <IconButton
            text="Leave Shop"
            onPress={() => navigation.navigate("Home")}
          />
          <IconButton
            text="Redeem"
            onPress={() => {
              confirmPurchase();
            }}
            additionalStyle={styles.redeemButton}
            disabled={selectedIndex === 0 ? false : !selectedIndex}
          />
        </View>
      </View>
    </>
  );
};

export default Redeem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 60,
    padding: 16,
    backgroundColor: "white",
  },
  bg: {
    position: "absolute",
    top: -100,
    left: -20,
    backgroundColor: "#EBF4FF",
    width: "120%",
    height: 350,
    zIndex: 0,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginBottom: 16,
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
  info: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  mainText: {
    fontSize: 20,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 350,
    objectFit: "contain",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  shopAccessoriesContainer: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
    flexWrap: "wrap",
  },
  buttons: {
    position: "absolute",
    bottom: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  redeemButton: {
    color: "white",
    backgroundColor: "007AFF",
  },
});
