import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../utils/color";
import image1 from "../../assets/images/walk2.png"; 
import { useTranslation } from "react-i18next";

const Walk2 = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image1} resizeMode="cover" style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("Reporting Made Easy")}</Text>
          <Text style={styles.description}>
            {t("With RE-MED, reporting construction")}
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.dotsContainer}>
            <View style={styles.dot}></View>
            <View style={[styles.dot, styles.activeDot]}></View>
            <View style={styles.dot}></View>
          </View>
          <LinearGradient
            colors={["#709a60", "#eab845"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => navigation.navigate("Walk3")}
            >
              <Text style={styles.nextButtonText}>{t("Next")}</Text>
            </TouchableOpacity>
          </LinearGradient>
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
    height: "30%",
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginBottom: "27%",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666666",
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
    marginTop: 12,
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: "4.3%",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 6,
    backgroundColor: "#cccccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
  gradient: {
    width: "95%",
    borderRadius: 8,
    marginTop: 20,
  },
});

export default Walk2;
