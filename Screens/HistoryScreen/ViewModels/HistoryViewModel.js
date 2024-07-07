import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../../Navigation/apiConfig";
import { UserContext } from "../../../Navigation/Routings/UserContext";

export const useHistoryViewModel = () => {
  const { user } = useContext(UserContext);

  const [searchQuery, setSearchQuery] = useState("");
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
  const [hasMoreReports, setHasMoreReports] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setInitialLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}remed/api/reports/getmy_reports.php?current_user_id=${user.id}`
      );
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
      setHasMoreReports(data.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchMoreReports = async () => {
    if (isFetchingMore || !hasMoreReports) return;
    setIsFetchingMore(true);
    try {
      const response = await fetch(
        `${BASE_URL}remed/api/reports/getmy_reports.php?current_user_id=${
          user.id
        }&page=${page + 1}`
      );
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
      setReports((prevReports) => {
        const uniqueReports = [...prevReports];
        transformedData.forEach((item) => {
          if (!uniqueReports.some((report) => report.id === item.id)) {
            uniqueReports.push(item);
          }
        });
        return uniqueReports;
      });
      setFilteredReports((prevReports) => {
        const uniqueReports = [...prevReports];
        transformedData.forEach((item) => {
          if (!uniqueReports.some((report) => report.id === item.id)) {
            uniqueReports.push(item);
          }
        });
        return uniqueReports;
      });
      setPage((prevPage) => prevPage + 1);
      setHasMoreReports(data.length > 0);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
    setIsFetchingMore(false);
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

    sortedReports.sort((a, b) => {
      if (sortByDate && a.createdAt !== b.createdAt) {
        return a.createdAt - b.createdAt;
      }

      if (sortByLocation && a.location !== b.location) {
        return a.location.localeCompare(b.location);
      }

      if (sortByStatus) {
        const statusOrder = {
          Collected: 0,
          Pending: 1,
          Reported: 2,
        };
        return statusOrder[a.status] - statusOrder[b.status];
      }

      return 0;
    });

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

  return {
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
    setSortByDate,      // Adding missing setters
    setSortByLocation,  // Adding missing setters
    setSortByStatus,    // Adding missing setters
  };
};
