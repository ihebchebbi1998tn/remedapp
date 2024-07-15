// Header.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/color";
import SidebarModal from "../../SideBar/SidebarModal";
import Header2 from "./Header2";
import { useTranslation } from "react-i18next";
import { SignOutModal ,  ReportBugModal} from "./Modals";
import styles from "../Styles/StyleHeader";
import useHeaderViewModel from "../ViewModels/HeaderViewModel";
const Header = () => {
    const {
        isSidebarOpen, isUserDropdownOpen, isSignOutModalOpen, isReportBugModalOpen, bugDescription, setBugDescription,
        openSidebar, closeSidebar, toggleUserDropdown, handleSignOut, confirmSignOut, cancelSignOut, handleReportBug, closeReportBugModal, sendBugReport
    } = useHeaderViewModel();
    const { t } = useTranslation();

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={openSidebar} style={styles.sidebarIcon}>
                    <Ionicons name="menu" size={24} color={Colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleUserDropdown} style={styles.profileIcon}>
                    <Ionicons name="person-circle" size={24} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <SidebarModal isOpen={isSidebarOpen} onClose={closeSidebar} />
            {isUserDropdownOpen && (
                <UserDropdownMenu
                    onClose={toggleUserDropdown}
                    onReportBug={handleReportBug}
                    onSignOut={handleSignOut}
                    t={t}
                />
            )}
            <SignOutModal
                isOpen={isSignOutModalOpen}
                onClose={cancelSignOut}
                onConfirm={confirmSignOut}
                t={t}
            />
            <ReportBugModal
                isOpen={isReportBugModalOpen}
                onClose={closeReportBugModal}
                onSend={sendBugReport}
                bugDescription={bugDescription}
                setBugDescription={setBugDescription}
                t={t}
            />
            <Header2 />
        </>
    );
};

const UserDropdownMenu = ({ onClose, onReportBug, onSignOut, t }) => {
    return (
        <View style={styles.userDropdown}>
            <TouchableOpacity onPress={onSignOut} style={styles.userDropdownItem}>
                <Ionicons name="log-out" size={20} color={Colors.primary} style={styles.icon} />
                <Text>{t("header.signout")}</Text>
            </TouchableOpacity>
            <View style={styles.dropdownSeparator} />
            <TouchableOpacity onPress={onReportBug} style={styles.userDropdownItem}>
                <Ionicons name="bug" size={20} color={Colors.primary} style={styles.icon} />
                <Text>{t("header.reportbug")}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Header;
