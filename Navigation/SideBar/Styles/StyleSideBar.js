import Colors from "../../../utils/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    justifyContent: 'flex-end',
  },
  sidebar: {
    backgroundColor: Colors.white,
    width: '85%',
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  content: {
    margin: 22,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
  },
  description: {
    fontSize: 13,
    marginBottom: 20,
    color: Colors.text,
  },
  separator: {
    borderBottomColor: Colors.primary2,
    borderBottomWidth: 1,
    width: '45%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.primary,
  },
  bottomItem: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.primary,
  },
  languageHeaderText: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  languageButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  flagIcon: {
    width: 20,
    height: 20,
  },
  languageMenu: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginTop: 5,
  },
  languageMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  languageMenuItemText: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  reportBugButton: {
    backgroundColor: Colors.error,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  reportBugButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 65,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  centerText: {
    textAlign: 'center',
  },
  bottom: {
    marginBottom: 10,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.text,
    marginTop: 20,
  },
});
  
  export default styles;