import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("userDetails");
      setLoggedIn(!!user);
    };

    checkUser();
  }, []);

  if (loggedIn === null) return null;

  return <Redirect href={loggedIn ? "/home" : "/login"} />;
}