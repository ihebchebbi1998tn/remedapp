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
    borderRadius: 15,  // Increased for rounder corners
    height: 42,   
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,    
    backgroundColor: Colors.white,
    opacity: 0.9, // Added transparency
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // For Android shadow
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
        width: "50%",
        borderRadius: 20,
    height: 50,   
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,    
    backgroundColor: Colors.primary,
    shadowColor: "#000", // Shadow color
    shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
  },
  buttonText: {
    fontSize: 15,     
    fontWeight: "bold",
    color: Colors.white, // Ensuring text is visible against the button color
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
    alignSelf: "center",  // This ensures the button aligns at the center within its parent
    elevation: 2,
  },
  
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 10,
    width: "85%",
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  countryText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
  closeButton: {
    alignSelf: "flex-end",
    borderRadius: 20,
    padding: 10,

  },
  closeButtonText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
  searchInput: {
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    fontSize: 30,
  },
 
});

export default styles;
