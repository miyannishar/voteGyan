import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../lib/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createUser } from "../../lib/firebase/firestore";

const Login = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = response.user;
      await createUser(user.uid, name, email);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          source={require("../../assets/adaptive-icon.png")}
          style={styles.image}
        />
        <Text style={styles.title}>GROW TO VOTE</Text>
        {/* <TextInput
          style={styles.input}
          placeholder="Name"
          autoCapitalize="none"
          value={name}
          onChangeText={(text) => setName(text)}
        /> */}
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Text>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              autoCapitalize="none"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="0000ff" />
        ) : (
          <>
            <Button title="Login" onPress={signIn} />
            <Button
              title="No account yet? Sign up here."
              onPress={() => navigation.navigate("Signup")}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 16,
  },
  title: {
    fontSize: 36,
  },
  inputs: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    gap: 8,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    marginVertical: 4,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    marginHorizontal: "auto",
  },
});
