import Colors from "../../../utils/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sidebarIcon: {
    marginRight: 10,
  },
  profileIcon: {
    marginLeft: "auto",
  },
  userDropdown: {
    position: 'absolute',
    top: '40%',
    right: '12%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 5,
    padding: 6,
    zIndex: 99999999,
  },
  userDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  dropdownSeparator: {
    height: 2,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    width: 300,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    textAlignVertical: "top",
      opacity: 0.9,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: Colors.primary,
  },
});
  
  export default styles;