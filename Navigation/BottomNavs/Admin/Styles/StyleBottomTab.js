import Colors from "../../../../utils/color";
import { StyleSheet , Dimensions} from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    elevation: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 17,
  },
  startContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: 42,
    padding: 13,
    marginBottom: 8,
    elevation: 6,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  activeTabButton: {
    backgroundColor: "#FFF",
    borderRadius: 26,
    paddingHorizontal: 10,
  },
  tabLabel: {
    marginTop: 2,
    fontSize: 10,
    color: "#A4A4A4",
  },
  activeTabLabel: {
    color: Colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: width * 0.9,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.primary,
    paddingHorizontal: 10,
  },
});
  
  export default styles;