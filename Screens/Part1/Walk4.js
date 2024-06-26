import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../utils/color";
import * as Location from 'expo-location'; 
import { useTranslation } from "react-i18next";

const Walk4 = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const handleLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    navigation.navigate("LoginScreen");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/map.jpg')}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t('ENABLE YOUR LOCATION')}</Text>
        </View>
        <View style={styles.footer}>
          <LinearGradient
            colors={["#709a60", "#eab845"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <TouchableOpacity style={styles.nextButton} onPress={handleLocationPermission}>
              <Text style={styles.nextButtonText}>{t('Use my location')}</Text>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity style={styles.outlinedButton} onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.outlinedButtonText}>{t('Skip for now')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "65%",
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginBottom: "27%",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  footer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  nextButton: {
    borderRadius: 8,
    paddingVertical: 1,
    paddingHorizontal: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: '5.4%',
  },
  outlinedButton: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "95%",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  outlinedButtonText: {
    color:  Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  gradient: {
    width: "95%",
    borderRadius: 8,
    marginTop: 20,
  },
});

export default Walk4;
