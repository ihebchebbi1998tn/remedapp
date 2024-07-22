import Colors from "../../../../utils/color";
import {StyleSheet} from "react-native";
import FontRessources from "../../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.white,
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
    fontSize: FontRessources.BottomNavTabsLabel,
    color: Colors.BottomNavsInactiveColor,
  },
  activeTabLabel: {
    color: Colors.primary,
  },
});
  
  export default styles;