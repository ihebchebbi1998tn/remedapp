import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Modal,
  Button,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/color";
import { useTranslation } from "react-i18next";
import { useSharedViewModel } from "../ViewModels/SharedViewModel";
import styles from "../Styles/StyleHomeScreen";

const HomeScreenAdmin = () => {
  const { search, setSearch, filteredData, refreshing, onRefresh, loadMore } =
    useSharedViewModel();
  const { t } = useTranslation();

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderHeader = () => (
    <View style={styles.searchContainer}>
      <View style={styles.inputText}>
        <Ionicons name="search-outline" size={17} color={Colors.primary} />
        <TextInput
          placeholder={t("HomeScreenAdmin.Search")}
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <AntDesign name="close" size={17} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleItemPress(item)}
      key={item.id}
    >
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
    <View style={{ backgroundColor: Colors.MainBackground, flex: 1 }}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        key={"two-column"}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
      <View style={styles.bottomNavigator}></View>

      {/* Modal for displaying item details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image source={selectedItem.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Text style={styles.modalLocation}>{selectedItem.location}</Text>
                <Text style={styles.modalDistance}>{selectedItem.distance}</Text>
                <Button
                  title="Close"
                  onPress={() => setModalVisible(false)}
                  color={Colors.primary}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreenAdmin;
