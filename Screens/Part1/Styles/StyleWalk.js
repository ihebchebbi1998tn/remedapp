import { StyleSheet } from "react-native";
import Colors from "../../../utils/color";
const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    container: {
      flex: 1,
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    imageSmall: {
      width: "80%",
      height: "16%",
    },
    imageMedium: {
      width: "80%",
      height: "30%",
    },
    imageLarge: {
      width: "100%",
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
      marginBottom: 10,
      textAlign: "center",
    },
    description: {
      fontSize: 14,
      color: Colors.descriptionTexts,
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
      color: Colors.buttonsTexts,
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: "4.3%",
    },
    outlinedButton: {
      backgroundColor: Colors.white,
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
      color: Colors.primary,
      fontSize: 16,
      fontWeight: "bold",
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
      backgroundColor: Colors.dotsBackground,
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
  
  export default styles;