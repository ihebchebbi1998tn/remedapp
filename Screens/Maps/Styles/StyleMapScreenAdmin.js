import { Dimensions , StyleSheet} from "react-native";
import Colors from "../../../utils/color";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { flex: 3 },
  map: { flex: 3, width: screenWidth * 1.2 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "rgba(255,255,255, 0.8)",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    width: screenWidth * 0.8,
    transform: [{ scale: 0.8 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginLeft: 13,
    marginRight: 10,
  },
  modalReportButton: {
    backgroundColor: Colors.reportButton, 
  },
  modalButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  markerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 0,
  },
  localizeButton: {
    position: "absolute",
    bottom: "12%", 
    right: "3%", 
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dropdownContainer: {
    width: "100%",
    position: "absolute",
    top: 40,
    zIndex: 10,
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  markerDescription: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  markerStateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  pendingText: {
    color: "orange",
  },
  collectedText: {
    color: "green",
  },
  reportedText: {
    color: "red",
  },
  markerLocation: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  markerPicker: {
    fontSize: 16,
    marginBottom: 10,
    fontStyle: "italic",
  },
  markerDate: {
    fontSize: 14,
    color: "gray",
    marginVertical: 5,
  },
  markerImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginTop: 15,
    resizeMode: "contain",
  },
  searchContainer: {
    position: "absolute",
    top: "2%",
    right: "2.3%", 
    width: "95%",
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sortingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 1,
    marginTop: 10,
    padding: 10,
    zIndex: 1,
  },
  sortButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeSortButton: {
    backgroundColor: Colors.primary,
  },
  sortButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 11,
  },
  gradient: {
    width: "95%",
    borderRadius: 15,
  },
  activeSortButtonText: {
    color: Colors.white,
  },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: Colors.primary,
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  actionButton: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: "32%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  confirmationModal: {
    padding: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    width: screenWidth * 0.7, 
    marginTop: "50%",
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 20,
  },
  confirmationButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  confirmationButton: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  confirmationCancelButton: {
    backgroundColor: Colors.reportButton,
  },
  confirmationConfirmButton: {
    backgroundColor: Colors.primary, 
  },
  confirmationButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});


export default styles;