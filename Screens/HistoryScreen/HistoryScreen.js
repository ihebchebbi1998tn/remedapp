import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Image, Modal, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Switch } from 'react-native-paper';
import BottomTabNavigator from '../../Navigation/BottomTabNavigator';
import Header from '../../Navigation/Header';
import Colors from '../../utils/color';
import { useTranslation } from "react-i18next";
import { BASE_URL } from '../../Navigation/apiConfig';
import { UserContext } from '../../Navigation/UserContext';

const HistoryScreen = () => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByLocation, setSortByLocation] = useState(false);
  const [sortByStatus, setSortByStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  useEffect(() => {
    // Debounce search input
    const delayDebounceFn = setTimeout(() => {
      filterReports(searchQuery);
    }, 300);
    return () => clearTimeout(delayDebounceFn); // Clear timeout on cleanup
  }, [searchQuery]);

  useEffect(() => {
    // Sort filtered reports
    sortReports();
  }, [sortByDate, sortByLocation, sortByStatus]);

  const fetchData = async () => {
    setInitialLoading(true); // Set initial loading state
    try {
      const response = await fetch(`${BASE_URL}remed/api/reports/getmy_reports.php?current_user_id=${user.id}`);
      const data = await response.json();
      const transformedData = data.map((item) => ({
        id: item.id,
        title: item.title,
        location: `${item.location} (${item.altitude}, ${item.longitude})`,
        description: item.description,
        status: item.state,
        collected: item.pickedup_by !== null,
        createdAt: new Date(item.created_at),
        image: { uri: `${BASE_URL}remed/api/reports/` + item.picture },
      }));
      setReports(transformedData); // Update reports
      setFilteredReports(transformedData); // Update filtered reports
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setInitialLoading(false); // Clear initial loading state
  };

  const renderReportItem = ({ item }) => (
    <TouchableOpacity style={styles.reportItem} onPress={() => handleReportPress(item)}>
      <Image source={item.image} style={styles.image} />
      <Text>{t("HistoryScreen.Title")}: {item.title}</Text>
      <Text>{t("HistoryScreen.Location")}: {item.location}</Text>
      <Text>{t("HistoryScreen.Description")}: {item.description}</Text>
      <Text>{t("HistoryScreen.Status")}: 
        <Text style={{ color: getStatusColor(item.status) }}>{getStatusText(item.status)}</Text>
      </Text>
      <Text>{t("HistoryScreen.CreatedAt")} At: {item.createdAt.toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return 'orange';
      case "Collected":
        return 'green';
      case "Reported":
        return 'red';
      default:
        return 'red'; // Default to red for any other status
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Pending":
        return '⟳';
      case "Collected":
        return '✓';
      case "Reported":
        return 'ϟ';
      default:
        return status; // Use the status itself for any other status
    }
  };

  const handleReportPress = (report) => {
    console.log('Pressed report:', report);
  };

  const filterReports = (query) => {
    setLoading(true); // Set loading state
    const filtered = reports.filter(
      (report) =>
        report.title.toLowerCase().includes(query.toLowerCase()) ||
        report.location.toLowerCase().includes(query.toLowerCase()) ||
        report.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReports(filtered); // Update filtered reports
    setLoading(false); // Clear loading state
  };

  const sortReports = () => {
    setLoading(true); // Set loading state
    let sortedReports = [...filteredReports];
    if (sortByDate) {
      sortedReports.sort((a, b) => a.createdAt - b.createdAt);
    }
    if (sortByLocation) {
      sortedReports.sort((a, b) => a.location.localeCompare(b.location));
    }
    if (sortByStatus) {
      sortedReports.sort((a, b) => (a.collected === b.collected ? 0 : a.collected ? -1 : 1));
    }
    setFilteredReports(sortedReports); // Update filtered reports
    setLoading(false); // Clear loading state
  };

  const openSortModal = () => {
    setShowModal(true);
  };

  const closeSortModal = () => {
    setShowModal(false);
  };

  const handleRefresh = () => {
    setRefreshing(true); // Set refreshing state
    fetchData().then(() => setRefreshing(false)); // Fetch data and clear refreshing state
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Header title="Reports History" />
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t("HistoryScreen.Search")}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity style={styles.settingsButton} onPress={openSortModal}>
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {initialLoading ? <ActivityIndicator size="large" color={Colors.primary} /> : (
          <FlatList
            data={filteredReports}
            renderItem={renderReportItem}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[Colors.primary]} // Android colors
                tintColor={Colors.primary} // iOS color
              />
            }
          />
        )}
      </View>
      <BottomTabNavigator />
      <Modal visible={showModal} transparent={true} animationType="fade" onRequestClose={closeSortModal}>
        <TouchableOpacity style={styles.modalOverlay} onPress={closeSortModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("HistoryScreen.SortBy")}</Text>
            <View style={styles.sortOption}>
              <Text>{t("HistoryScreen.DateCreated")}</Text>
              <Switch
                value={sortByDate}
                onValueChange={(value) => setSortByDate(value)}
                color={Colors.primary}
              />
            </View>
            <View style={styles.sortOption}>
              <Text>{t("HistoryScreen.Location")}</Text>
              <Switch
                value={sortByLocation}
                onValueChange={(value) => setSortByLocation(value)}
                color={Colors.primary}
              />
            </View>
            <View style={styles.sortOption}>
              <Text>{t("HistoryScreen.Status")}</Text>
              <Switch
                value={sortByStatus}
                onValueChange={(value) => setSortByStatus(value)}
                color={Colors.primary}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  reportItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  settingsButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 15,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
});

export default HistoryScreen;
