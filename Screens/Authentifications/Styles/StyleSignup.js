import Colors from "../../../utils/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    sidebarIcon: {
      marginRight: 20,
      marginTop: 5,
    },
    container: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 15, 
    },
    title: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    description: {
      fontSize: 10,
      textAlign: "center",
      marginBottom: 10,
    },
    inputArabic: {
      flex: 1,
      marginLeft: 8,
      fontSize: 13,
      textAlign: "right", 
    },
    inputContainer: {
      width: "100%",
      marginBottom: 17, 
    },
    labelText: {
      marginBottom: 3,
      fontSize: 13,     
      fontWeight: "bold",
    },
    inputText: {
      width: "100%",
      borderRadius: 8,  
      height: 42,   
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,    
      backgroundColor: Colors.white,
    },
    input: {
      flex: 1,
      marginLeft: 8,    
      fontSize: 13,     
    },
    logo: {
      width: 220,   
      height: 70,   
      marginBottom: 5,  
    },
    smallerImage: {
      width: 270,   
      height: 60,   
      marginBottom: 10,
    },
    button: {
      width: "100%",
      borderRadius: 10,
      height: 50,   
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,    
    },
    buttonText: {
      fontSize: 15,     
      fontWeight: "bold",
    },
    forgotPasswordButton: {
      alignItems: "center",
      marginTop: 17,    
      marginBottom: 20,
    },
    forgotPasswordText: {
      fontSize: 13, 
      color: Colors.primary,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      width: "80%",
      padding: 20,
      backgroundColor: "white",
      borderRadius: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 16,
    },
    modalButton: {
      backgroundColor: Colors.primary,
      borderRadius: 50, 
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      elevation: 2,
    },
  });
  
  export default styles;