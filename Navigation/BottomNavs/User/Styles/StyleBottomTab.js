import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../../utils/color";
const { width } = Dimensions.get("window");
import FontRessources from "../../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FFF",
    elevation: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  tabGroup: {
    flexDirection: "row",
  },
  cameraContainer: {
    padding: 10,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    elevation: 10,
  },
  cameraButton: {
    height: 40, 
    width: 40,   
    borderRadius: 40 / 2,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16, 
    paddingVertical: 6,    
  },
  activeTabButton: {
    fontSize: FontRessources.BottomNavTabsLabel,
    color: Colors.primary,
  },
  tabLabel: {
    fontSize: FontRessources.BottomNavTabsLabel,
    color: Colors.BottomNavsInactiveColor,
  },
  activeTabLabel: {
    color: Colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.primary,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    bottom:20,
  },
  imageContainer: {
    marginVertical: 20,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  labelText: {
    fontSize: 14,
    color: Colors.primary,
  },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 5,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  celebrationImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  thankYouSubText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  errorCard: {
    position: "relative",
    width: width * 0.8,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    opacity: 0.8,
  },
  overlayIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayIconText: {
    fontSize: 60,
    color: "red",
  },
});

export default styles;
