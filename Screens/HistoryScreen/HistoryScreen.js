import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Image, Modal, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Switch } from 'react-native-paper';
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
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      filterReports(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    sortReports();
  }, [sortByDate, sortByLocation, sortByStatus]);

  const fetchReports = async () => {
    setInitialLoading(true);
    try {
      const response = await fetch(`${BASE_URL}remed/api/reports/getmy_reports.php?current_user_id=${user.id}`);
      const data = await response.json();
      const transformedData = data.map((item) => ({
        id: `${item.id}-${item.created_at}`,
        title: item.title,
        location: `${item.location} (${item.altitude}, ${item.longitude})`,
        description: item.description,
        status: item.state,
        collected: item.pickedup_by !== null,
        createdAt: new Date(item.created_at),
        image: { uri: `${BASE_URL}remed/api/reports/` + item.picture },
      }));
      setReports(transformedData);
      setFilteredReports(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchMoreReports = async () => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);
    try {
      const response = await fetch(`${BASE_URL}remed/api/reports/getmy_reports.php?current_user_id=${user.id}&page=${page + 1}`);
      const data = await response.json();
      const transformedData = data.map((item) => ({
        id: `${item.id}-${item.created_at}`,
        title: item.title,
        location: `${item.location} (${item.altitude}, ${item.longitude})`,
        description: item.description,
        status: item.state,
        collected: item.pickedup_by !== null,
        createdAt: new Date(item.created_at),
        image: { uri: `${BASE_URL}remed/api/reports/` + item.picture },
      }));
      setReports((prevReports) => [...prevReports, ...transformedData]);
      setFilteredReports((prevReports) => [...prevReports, ...transformedData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
    setIsFetchingMore(false);
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
      <Text>{t("HistoryScreen.CreatedAt")}: {item.createdAt.toLocaleDateString()}</Text>
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
        return 'gray';
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
        return status;
    }
  };

  const handleReportPress = (report) => {
    // Handle report press, possibly navigate to a report details screen
    console.log('Pressed report:', report);
  };

  const filterReports = (query) => {
    setLoading(true);
    const filtered = reports.filter(
      (report) =>
        report.title.toLowerCase().includes(query.toLowerCase()) ||
        report.location.toLowerCase().includes(query.toLowerCase()) ||
        report.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReports(filtered);
    setLoading(false);
  };

  const sortReports = () => {
    setLoading(true);
    let sortedReports = [...filteredReports];
    if (sortByDate) {
      sortedReports.sort((a, b) => a.createdAt - b.createdAt);
    }
    if (sortByLocation) {
      sortedReports.sort((a, b) => a.location.localeCompare(b.location));
    }
    if (sortByStatus) {
      sortedReports.sort((a, b) => (a.status === b.status ? 0 : a.status === "Collected" ? -1 : 1));
    }
    setFilteredReports(sortedReports);
    setLoading(false);
  };

  const openSortModal = () => {
    setShowModal(true);
  };

  const closeSortModal = () => {
    setShowModal(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchReports().then(() => setRefreshing(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
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
            ListFooterComponent={isFetchingMore && <ActivityIndicator size="large" color={Colors.primary} />}
          />
        )}
      </View>
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
    marginBottom: 10,
  },
});

export default HistoryScreen;  
