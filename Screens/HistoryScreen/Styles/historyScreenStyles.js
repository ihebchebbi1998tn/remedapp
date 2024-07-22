import { StyleSheet } from "react-native";
import Colors from "../../../utils/color";

const historyScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MainBackground,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  reportItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    marginRight: 10,
  },
  settingsButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 15,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default historyScreenStyles;
