import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import Colors from "../../../utils/color";
import { useTranslation } from "react-i18next";
import { useHistoryViewModel } from "../ViewModels/HistoryViewModel";
import historyScreenStyles from "../Styles/historyScreenStyles";
import { SafeAreaView } from 'react-native-safe-area-context';

const HistoryScreen = () => {
  const { t } = useTranslation();
  const {
    searchQuery,
    setSearchQuery,
    filteredReports,
    initialLoading,
    loading,
    showModal,
    sortByDate,
    sortByLocation,
    sortByStatus,
    refreshing,
    fetchMoreReports,
    filterReports,
    sortReports,
    openSortModal,
    closeSortModal,
    handleRefresh,
    setSortByDate,      
    setSortByLocation,  
    setSortByStatus,    
  } = useHistoryViewModel();

  const renderReportItem = ({ item }) => (
    <TouchableOpacity style={historyScreenStyles.reportItem}>
      <Image source={item.image} style={historyScreenStyles.image} />
      <Text>
        {t("HistoryScreen.Title")}: {item.title}
      </Text>
      <Text>
        {t("HistoryScreen.Location")}: {item.location}
      </Text>
      <Text>
        {t("HistoryScreen.Description")}: {item.description}
      </Text>
      <Text>
        {t("HistoryScreen.Status")}:
        <Text style={{ color: getStatusColor(item.status) }}>
          {getStatusText(item.status)}
        </Text>
      </Text>
      <Text>
        {t("HistoryScreen.CreatedAt")}: {item.createdAt.toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Collected":
        return "green";
      case "Reported":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Pending":
        return "⟳";
      case "Collected":
        return "✓";
      case "Reported":
        return "ϟ";
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={historyScreenStyles.container} edges={['top', 'left', 'right']}>

      <View style={historyScreenStyles.content}>
        <View style={historyScreenStyles.searchContainer}>
          <TextInput
            style={historyScreenStyles.searchInput}
            placeholder={t("HistoryScreen.Search")}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              filterReports(text);
            }}
          />
          <TouchableOpacity
            style={historyScreenStyles.settingsButton}
            onPress={openSortModal}
          >
            <Ionicons name="settings" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        {initialLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <FlatList
            data={filteredReports}
            keyExtractor={(item) => item.id}
            renderItem={renderReportItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[Colors.primary]}
                tintColor={Colors.primary}
              />
            }
            onEndReached={fetchMoreReports}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading && (
                <ActivityIndicator size="large" color={Colors.primary} />
              )
            }
          />
        )}
      </View>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeSortModal}
      >
        <TouchableOpacity
          style={historyScreenStyles.modalOverlay}
          onPress={closeSortModal}
        >
          <View style={historyScreenStyles.modalContent}>
            <Text style={historyScreenStyles.modalTitle}>
              {t("HistoryScreen.SortBy")}
            </Text>
            <View style={historyScreenStyles.sortOption}>
              <Text>{t("HistoryScreen.DateCreated")}</Text>
              <Switch
                value={sortByDate}
                onValueChange={(value) => {
                  setSortByDate(value);
                  sortReports();
                }}
                color={Colors.primary}
              />
            </View>
            <View style={historyScreenStyles.sortOption}>
              <Text>{t("HistoryScreen.Location")}</Text>
              <Switch
                value={sortByLocation}
                onValueChange={(value) => {
                  setSortByLocation(value);
                  sortReports();
                }}
                color={Colors.primary}
              />
            </View>
            <View style={historyScreenStyles.sortOption}>
              <Text>{t("HistoryScreen.Status")}</Text>
              <Switch
                value={sortByStatus}
                onValueChange={(value) => {
                  setSortByStatus(value);
                  sortReports();
                }}
                color={Colors.primary}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default HistoryScreen;
