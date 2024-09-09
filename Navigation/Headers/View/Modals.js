// Modals.js
import React from "react";
import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import styles from "../Styles/StyleHeader";
import { SafeAreaView } from 'react-native-safe-area-context';

export const SignOutModal = ({ isOpen, onClose, onConfirm, t }) => {
    return (
        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{t("header.AreYouSure")}</Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                            <Text style={styles.modalButtonText}>{t("header.Cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={onConfirm}>
                            <Text style={styles.modalButtonText}>{t("header.SignOut")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

export const ReportBugModal = ({ isOpen, onClose, onSend, bugDescription, setBugDescription, t }) => {
    return (

        <Modal visible={isOpen} animationType="fade" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{t("header.reportbug")}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder={t("header.EnterBugDescription")}
                        value={bugDescription}
                        onChangeText={setBugDescription}
                        multiline
                    />
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                            <Text style={styles.modalButtonText}>{t("header.Cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={onSend}>
                            <Text style={styles.modalButtonText}>{t("header.Send")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

