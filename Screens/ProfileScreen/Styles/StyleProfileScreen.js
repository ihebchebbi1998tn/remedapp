import { StyleSheet } from "react-native";
import Colors from "../../../utils/color";

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 16,
      paddingBottom: 80, 
    },
    header: {
      padding: 16,
      backgroundColor: Colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: Colors.white,
    },
    item: {
      flexDirection: "row",
      alignItems: "center", 
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    itemText: {
      marginLeft: 16,
      fontSize: 18,
      color: "green",
    },
    faqContainer: {
      padding: 16,
      backgroundColor: Colors.MainBackground,
    },
    faqItem: {
      marginBottom: 16,
    },
    faqQuestion: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.primary,
    },
    faqAnswer: {
      fontSize: 14,
      color: "#333",
    },
    helpContainer: {
      padding: 16,
      backgroundColor: Colors.MainBackground,
    },
    helpItem: {
      marginBottom: 16,
    },
    helpQuestion: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.primary,
    },
    helpAnswer: {
      fontSize: 14,
      color: "#333",
    },
    privacyContainer: {
      padding: 16,
      backgroundColor: Colors.MainBackground,
    },
    privacyText: {
      fontSize: 14,
      color: "#333",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      padding: 20,
      backgroundColor: Colors.white,
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      marginBottom: 10,
    },
    textArea: {
      height: 100,
    },
    pickerContainer: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      marginBottom: 10,
    },
    modalButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 10,
    },
    modalButton: {
      flex: 1,
      alignItems: "center",
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    modalButtonContact: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    modalButtonText: {
      marginLeft: 10,
      color: Colors.white,
      fontSize: 16,
    },
    closeButton: {
      position: "absolute",
      top: 10,
      right: 10,
    },
  });

  export default styles;