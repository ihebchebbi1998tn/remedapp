import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Animated, PanResponder, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import { useLanguage } from "./LanguageContext";
import Colors from '../utils/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SidebarModal = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { changeLanguage } = useLanguage();

  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [selectedLanguage, setSelectedLanguage] = useState({ key: 'en', name: 'English', flag: require('../assets/images/us.png') });
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
    console.log(`Current language is: ${selectedLanguage.key}`);
  }, [selectedLanguage]);
  
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
      if (!isInitialLoad) onClose(); // Avoiding close on initial load
    }
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const languages = [
    { key: 'en', name: 'English', flag: require('../assets/images/us.png') },
    { key: 'fr', name: 'French', flag: require('../assets/images/fr.png') },
    { key: 'ar', name: 'Arabic', flag: require('../assets/images/ar.png') },
    { key: 'it', name: 'Italian', flag: require('../assets/images/it.jpg') },
  ];

  const handleBugReport = () => {
    // Handle bug reporting
    alert("Bug reported!");
  };

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
      <View style={styles.modalContainer}>
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
              <Image source={require('../assets/logoall.png')} style={styles.image} />

              <Text style={[styles.menuItem, styles.centerText]}>
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

            <TouchableOpacity style={styles.reportBugButton} onPress={handleBugReport}>
              <Text style={styles.reportBugButtonText}>{t('sidebar.reportBug')}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    justifyContent: 'flex-end',
  },
  sidebar: {
    backgroundColor: Colors.white,
    width: '85%',
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  content: {
    margin: 22,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
  },
  description: {
    fontSize: 13,
    marginBottom: 20,
    color: Colors.text,
  },
  separator: {
    borderBottomColor: Colors.primary2,
    borderBottomWidth: 1,
    width: '45%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.primary,
  },
  bottomItem: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.primary,
  },
  languageHeaderText: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  languageButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  flagIcon: {
    width: 20,
    height: 20,
  },
  languageMenu: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginTop: 5,
  },
  languageMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  languageMenuItemText: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  reportBugButton: {
    backgroundColor: Colors.error,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  reportBugButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 65,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  centerText: {
    textAlign: 'center',
  },
  bottom: {
    marginBottom: 10,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.text,
    marginTop: 20,
  },
});

export default SidebarModal;
