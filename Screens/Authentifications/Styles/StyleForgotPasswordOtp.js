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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    marginRight: 10,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: Colors.white,
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
  },
  buttonText: {
    fontSize: 13, 
    fontWeight: "bold",
  },
  signupButton: {
    width: "100%",
    alignItems: "center",
    padding: 13, 
    borderRadius: 8, 
    borderWidth: 1,
  },
  signupButtonText: {
    fontSize: 13, 
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 14, 
    color: Colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    padding: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButton: {
    width: "100%",
    alignItems: "center",
    padding: 13,
    borderRadius: 8,
    marginBottom: 8,
  },
});
  
  export default styles;