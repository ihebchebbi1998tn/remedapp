import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Modal, Animated, PanResponder, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import { useLanguage } from "../LanguageContext";
import Colors from '../../utils/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles/StyleSideBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking } from 'react-native';

const openWebsite = () => {
  Linking.openURL('https://www.s-reg.tn/');
};

const SidebarModal = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { changeLanguage } = useLanguage();

  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [selectedLanguage, setSelectedLanguage] = useState({ key: 'en', name: 'English', flag: require('../../assets/images/us.png') });
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('appLanguage');
      if (savedLanguage) {
        const language = JSON.parse(savedLanguage);
        handleLanguageSelect(language.key, true);
      }
    };
    loadLanguage();
  }, []);

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isOpen ? 0 : -300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleLanguageSelect = async (languageKey, isInitialLoad = false) => {
    const language = languages.find(lang => lang.key === languageKey);
    if (language) {
      setSelectedLanguage(language);
      i18n.changeLanguage(languageKey);
      if (!isInitialLoad) {
        await AsyncStorage.setItem('appLanguage', JSON.stringify(language));
      }
      changeLanguage(languageKey);
      setIsLanguageMenuOpen(false);
      if (!isInitialLoad) onClose();
    }
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const languages = [
    { key: 'en', name: 'English', flag: require('../../assets/images/us.png') },
    { key: 'fr', name: 'French', flag: require('../../assets/images/fr.png') },
    { key: 'ar', name: 'Arabic', flag: require('../../assets/images/ar.png') },
    { key: 'it', name: 'Italian', flag: require('../../assets/images/it.jpg') },
  ];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dx > 20 || gestureState.dx < -20;
    },
    onPanResponderMove: Animated.event(
      [null, { dx: slideAnim }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -150) {
        Animated.spring(slideAnim, {
          toValue: -300,
          useNativeDriver: true,
        }).start(() => {
          onClose();
        });
      } else {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
        >
          <View style={styles.sidebar}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={Colors.primary} />
            </TouchableOpacity>

            <View style={styles.content}>
              <Text style={styles.title}>{t('sidebar.title')}</Text>
              <Text style={styles.description}>{t('sidebar.description')}</Text>
              <Image source={require('../../assets/logoall.png')} style={styles.image} />

              <Text style={[styles.menuItem, styles.centerText]} onPress={openWebsite}>
  {t('sidebar.menuItems.visitWebsite')}
</Text>

              <View style={styles.separator} />
              <Text style={[styles.menuItem, styles.centerText]}>
                {t('sidebar.menuItems.checkPoints')}
              </Text>
              <View style={styles.separator} />
              <Text style={[styles.menuItem, styles.centerText]}>
                {t('sidebar.menuItems.learnAboutUs')}
              </Text>
              <View style={styles.separator} />
            </View>

            <View style={styles.bottom}>
              <Text style={[styles.menuItem, styles.centerText, styles.languageHeaderText]}>
                {t('sidebar.languageHeader')}
              </Text>
              <TouchableOpacity onPress={toggleLanguageMenu} style={styles.languageButton}>
                <Image source={selectedLanguage.flag} style={styles.flagIcon} />
                <Text style={styles.languageButtonText}>{selectedLanguage.name}</Text>
              </TouchableOpacity>
              {isLanguageMenuOpen && (
                <View style={styles.languageMenu}>
                  {languages.map((language, index) => (
                    <TouchableOpacity key={index} style={styles.languageMenuItem} onPress={() => handleLanguageSelect(language.key)}>
                      <Image source={language.flag} style={styles.flagIcon} />
                      <Text style={styles.languageMenuItemText}>{language.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.bottom}>
              <Text style={styles.footerText}>{t('sidebar.madeBy')}</Text>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

export default SidebarModal;
