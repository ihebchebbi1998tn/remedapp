import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signup } from '../Services/apiService';
import { useTranslation } from 'react-i18next';

const useSignupViewModel = (navigation) => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [appLanguage, setAppLanguage] = useState('en'); 

  useEffect(() => {
    const fetchAppLanguage = async () => {
      try {
        const value = await AsyncStorage.getItem('appLanguage');
        if (value) {
          const parsedValue = JSON.parse(value);
          setAppLanguage(parsedValue.key);
        }
      } catch (error) {
        console.error(error);
        setAppLanguage('en'); 
      }
    };

    fetchAppLanguage();
    const intervalId = setInterval(fetchAppLanguage, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
  if (password !== confirmPassword) {
    alert(t('signup.passwordMismatch'));
    return;
  }

  try {
    const data = await signup({
      firstName,
      lastName,
      username,
      email,
      country,
      password,
    });
    setModalMessage(t('signup.successMessage'));
    setModalVisible(true);
  } catch (error) {
    setModalMessage(error.message || t('signup.errorMessage'));
    setModalVisible(true);
    console.error("Signup error:", error);
  }
};
  
  const getCountries = (language) => {
    const countries = {
      en: ["Tunisia", "Italy", "France", "England"],
      ar: ["تونس", "إيطاليا", "فرنسا", "إنجلترا"],
      fr: ["Tunisie", "Italie", "France", "Angleterre"],
      it: ["Tunisia", "Italia", "Francia", "Inghilterra"],
    };
    return countries[language] || countries.en;
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate('LoginScreen');
  };

  return {
    t,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    email,
    setEmail,
    country,
    setCountry,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    confirmPassword,
    setConfirmPassword,
    modalVisible,
    modalMessage,
    setModalVisible,
    handleCloseModal,
    handleSignup,
    getCountries,
    appLanguage
  };
};

export default useSignupViewModel;
