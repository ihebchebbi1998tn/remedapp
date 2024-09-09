import Colors from "../../../utils/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  notificationTextContainer: {
    flex: 1,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    paddingLeft: 10,
  },
  notificationDot: {
    position: "absolute",
    top: 3,
    right: 5,
    backgroundColor: "red",
    width: 6,
    height: 6,
    borderRadius: 4,
  },
  notificationMenu: {
    position: "absolute",
    top: "14.5%",
    right: '8%',
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 5,
    zIndex: 1,
  },
  notificationItem: {
    paddingVertical: 8,
  },
  notificationText: {
    fontSize: 12,
  },
  notificationTextRTL: {
    textAlign: 'right',
  },
  colon: {
    fontSize: 12,
    color: "green",
  },
});

  
  export default styles;