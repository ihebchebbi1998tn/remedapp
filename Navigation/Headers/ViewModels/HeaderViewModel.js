// HeaderViewModel.js
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../Routings/UserContext";
import { sendBugReportAPI } from "../Services/apiService2";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";


const useHeaderViewModel = () => {
    const navigation = useNavigation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
    const [isReportBugModalOpen, setIsReportBugModalOpen] = useState(false);
    const [bugDescription, setBugDescription] = useState("");
    const { user } = useContext(UserContext);
    const { t } = useTranslation();

    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);
    const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
    const handleSignOut = () => setIsSignOutModalOpen(true);
    const confirmSignOut = () => {
        setIsSignOutModalOpen(false);
        handleLogout();
    };
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    const cancelSignOut = () => setIsSignOutModalOpen(false);
    const handleReportBug = () => setIsReportBugModalOpen(true);
    const closeReportBugModal = () => setIsReportBugModalOpen(false);

    const sendBugReport = async () => {
        if (!bugDescription.trim()) {
            Alert.alert(t("header.ErrorMessageTitle"), t("header.ErrorMessage"));
            return;
        }

        try {
            await sendBugReportAPI(user, bugDescription);
            Alert.alert(t("header.SuccessMessageTitle"), t("header.SuccessMessage"));
        } catch (error) {
            Alert.alert(t("header.ErrorMessageTitle"), t("header.ErrorSendingReport"));
        } finally {
            setIsReportBugModalOpen(false);
        }
    };

    return {
        isSidebarOpen,
        isUserDropdownOpen,
        isSignOutModalOpen,
        isReportBugModalOpen,
        bugDescription,
        setBugDescription,
        openSidebar,
        closeSidebar,
        toggleUserDropdown,
        handleSignOut,
        confirmSignOut,
        cancelSignOut,
        handleReportBug,
        closeReportBugModal,
        sendBugReport
    };
};

export default useHeaderViewModel;
