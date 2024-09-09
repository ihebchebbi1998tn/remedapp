import { StyleSheet } from "react-native";
import Colors from "../../../utils/color";

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: Colors.pageBackground,
    paddingHorizontal: 15,
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
    borderRadius: 15,
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
        shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
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
           shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
 
});

export default styles;
