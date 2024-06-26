import React, { useEffect, useState ,useContext } from "react";
import { View, Image, StyleSheet, Text, ActivityIndicator, StatusBar,SafeAreaView } from "react-native";
import Colors from "../../utils/color";
const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("Walk1");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <Image
        source={require("../../assets/splash.png")} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <ActivityIndicator color={Colors.primary} size="large" />
        <LoadingText />
      </View>
    </SafeAreaView>
  );
};

const LoadingText = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text style={styles.loadingText}>
      Chargement{dots}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", 
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    alignItems: "center",
  },
  loadingText: {
    color: Colors.primary,
    marginTop: 10,
    fontSize: 16,
  },
});

export default SplashScreen;
