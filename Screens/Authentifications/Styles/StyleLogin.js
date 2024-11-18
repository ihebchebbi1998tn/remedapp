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
        marginTop: 5,
        marginRight: 20,
      },
      container: {
        flex: 0.9,
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
      inputContainer: {
        width: "100%",
        marginBottom: 17,
        paddingVertical: 5, // Adjust this to control space around input container
      },
      labelText: {
        marginBottom: 3,
        fontSize: 13,
        fontWeight: "bold",
      },
      inputText: {
        width: "100%",
        borderRadius: 15,
        height: 50, // Increased height for more space
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20, // Increased padding to add more space for text input
        backgroundColor: Colors.white,
        opacity: 0.9,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
      },
      input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 13,
      },
      inputArabic: {
        flex: 1,
        marginLeft: 8,
        fontSize: 13,
        textAlign: "right",
      },
      logo: {
        width: 220,
        height: 70,
        marginBottom: 5,
      },
      smallerImage: {
        width: 270,
        height: 60,
        marginBottom: 15,
      },
      button: {
        width: "100%",
        alignItems: "center",
        padding: 13,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: Colors.white,
        opacity: 0.9,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
      },
      buttonText: {
        fontSize: 13,
        fontWeight: "bold",
      },
      signupButton: {
        width: "100%",
        alignItems: "center",
        padding: 12,
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 8,
        opacity: 0.9,
      },
      signupButtonText: {
        fontSize: 13,
        fontWeight: "bold",
      },
      stayLoggedInContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginLeft: "1%",
      },
      stayLoggedInCheckbox: {
        marginRight: 8,
      },
      stayLoggedInText: {
        fontSize: 12,
        color: Colors.primary,
      },
      forgotPasswordButton: {
        marginTop: 10,
      },
      forgotPasswordText: {
        fontSize: 14,
        color: Colors.primary,
      },
      gradient: {
        width: "50%",
        height: "8%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginTop: 12,
       backgroundColor: Colors.primary,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
      },
      nextButtonText: {
        color: Colors.buttonsTexts,
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: "1%",
      },
    
    });
    
    export default styles;
    