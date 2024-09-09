import React from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../utils/color";
import Stats from "./Stats";
import { useSharedViewModel } from '../ViewModels/SharedViewModel';
import styles from "../Styles/StyleHomeScreen";
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const {
    filteredData,
    refreshing,
    onRefresh,
    loadMore,
  } = useSharedViewModel();

  const renderHeader = () => (
    <>
      <Stats />
    </>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={item.image} style={styles.cardImage} />
        {item.isLiked && (
          <View style={styles.checkContainer}>
            <AntDesign name="checkcircle" size={24} color={Colors.primary} />
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userLocation}>{item.location}</Text>
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
      <View style={{ flex: 1 , backgroundColor: Colors.MainBackground}} >
            
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        key={'two-column'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
      <View style={styles.bottomNavigator}></View>
    </View>
  );
};

export default HomeScreen;
