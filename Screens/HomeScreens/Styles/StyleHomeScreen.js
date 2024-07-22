import { StyleSheet } from "react-native";
import Colors from "../../../utils/color";

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: Colors.pageBackground,
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
    marginVertical: 0,
  },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  card: {
    width: "48%",
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  checkContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  infoContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
  },
  userLocation: {
    fontSize: 12,
  },
  distance: {
    fontSize: 12,
    marginTop: 5,
  },
  bottomNavigator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;
