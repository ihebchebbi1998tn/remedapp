import { StyleSheet } from "react-native";
import Colors from "../../../utils/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:15,
    backgroundColor: Colors.white,
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statsContainer: {
    alignItems: "center",
    marginBottom: 20,
    maringTop:10,
  },
  icon: {
    marginRight: 0,
  },
  iconRight: {
    marginLeft: '25%',
    marginRight: 0,
  },
  percentageText: {
    fontSize: 40,
    color: "#5A9360",
    marginTop: -110,
    marginLeft: 7,
  },
  subtitle: {
    fontSize: 16,
    color: "#5A9360",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "17%",
  },
  infoItem: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    color: "#5A9360",
  },
  infoSubtitle: {
    fontSize: 14,
    color: "#5A9360",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5A9360",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#FCF5F3",
    fontSize: 16,
    textAlign: "center",
  },
  headerText: {
    fontSize: 20,
    color: "#5A9360",
    marginTop: 10,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ecd58e",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    color: "#fff",
  },
  location: {
    fontSize: 14,
    color: "#fff",
  },
  likeButton: {
    padding: 10,
  },
  likeButtonText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  qrContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#5A9360",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#FCF5F3",
    fontSize: 16,
  },
});

export default styles;
