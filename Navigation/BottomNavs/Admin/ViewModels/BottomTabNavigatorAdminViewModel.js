import { useState } from "react";
import { Animated, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const useBottomTabNavigatorAdminViewModel = () => {
  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  const handleStartPress = () => {
    navigation.navigate("MapScreenAdmin");
  };

  const handleOptionSelect = () => {
    navigation.navigate("MapScreenAdmin");
  };

  const closeModal = () => {
    animateModalClose();
    setTimeout(() => {
      setMainModalVisible(false);
    }, 300);
  };

  const animateModalClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const modalStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0],
        }),
      },
    ],
  };

  const openModal = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMainModalVisible(true);
  };

  return {
    mainModalVisible,
    openModal,
    closeModal,
    modalStyle,
    handleStartPress,
    handleOptionSelect,
  };
};

export default useBottomTabNavigatorAdminViewModel;
