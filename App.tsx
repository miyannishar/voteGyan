import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Login from "./app/screens/Login";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./lib/firebase/firebase";
import Learn from "./app/screens/Learn";
import Home from "./app/screens/Home";
import Challenge from "./app/screens/Challenge";
import Redeem from "./app/screens/Redeem";
import Profile from "./app/screens/Profile";
import Signup from "./app/screens/Signup";
import Lesson from "./app/screens/Lesson";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout(extraProps) {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <Home {...props} user={extraProps.user} />}
      </InsideStack.Screen>
      <InsideStack.Screen
        name="Learn"
        component={Learn}
        // options={{ headerShown: false }}
      />
      <InsideStack.Screen name="Profile" options={{ headerShown: false }}>
        {(props) => <Profile {...props} user={extraProps.user} />}
      </InsideStack.Screen>
      <InsideStack.Screen name="Redeem" options={{ headerShown: false }}>
        {(props) => <Redeem {...props} user={extraProps.user} />}
      </InsideStack.Screen>
      <InsideStack.Screen name="Lesson" options={{ headerShown: false }}>
        {(props) => <Lesson {...props} user={extraProps.user} />}
      </InsideStack.Screen>
    </InsideStack.Navigator>
  );
}

export default function App() {
  // Remove authentication state check
  const mockUser = {
    uid: "test-user-id",
    email: "test@example.com"
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inside"
        screenOptions={{
          headerStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen name="Inside" options={{ headerShown: false }}>
          {(props) => <InsideLayout props={props} user={mockUser} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
