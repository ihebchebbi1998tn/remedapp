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
        borderRadius: 15,
    height: 42, 
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12, 
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
    width: "50%",
    alignItems: "center",
    padding: 13, 
    borderRadius: 20, 
    marginBottom: 8, 
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
    padding: 13, 
  },
  signupButtonText: {
    fontSize: 13, 
    fontWeight: "bold",
  },
});

  
  export default styles;