import React from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../../utils/color';
import useSignupViewModel from '../ViewModels/useSignupViewModel';
import styles from '../Styles/StyleSignup';

const SuccessModal = ({ visible, onClose, message, navigation }) => (
  <Modal visible={visible} transparent={true} animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{message}</Text>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Ionicons name="checkmark-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default function SignupScreen({ navigation }) {
  const {
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
    appLanguage,
  } = useSignupViewModel(navigation);

  const countries = getCountries();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary02 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/logotheme.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>{t('signup.title')}</Text>
          <Text style={styles.description}>{t('signup.description')}</Text>
          <Image
            source={require('../../../assets/logoall.png')}
            style={styles.smallerImage}
          />
          {appLanguage === 'ar' ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t('signup.firstName')}
                </Text>
                <View style={styles.inputText}>
                  <TextInput
                    placeholder={t('signup.firstNamePlaceholder')}
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                  <Ionicons
                    name="person-outline"
                    size={17}
                    color={Colors.primary}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t('signup.lastName')}
                </Text>
                <View style={styles.inputText}>
                  <TextInput
                    placeholder={t('signup.lastNamePlaceholder')}
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                  <Ionicons
                    name="person-outline"
                    size={17}
                    color={Colors.primary}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t('signup.username')}
                </Text>
                <View style={styles.inputText}>
                  <TextInput
                    placeholder={t('signup.usernamePlaceholder')}
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                  />
                  <Ionicons
                    name="person-outline"
                    size={17}
                    color={Colors.primary}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t('signup.email')}
                </Text>
                <View style={styles.inputText}>
                  <TextInput
                    placeholder={t('signup.email')}
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <Ionicons
                    name="mail-outline"
                    size={17}
                    color={Colors.primary}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.labelText, { color: Colors.primary }]}>
                  {t('signup.country')}
                </Text>
                <View style={styles.inputText}>
                   <Picker
                    selectedValue={country}
                    style={styles.input}
                    onValueChange={(itemValue) => setCountry(itemValue)}
                    >
                    {countries.map((country, index) => (
                      <Picker.Item key={index} label={country} value={country} />
                    ))}
                  </Picker>
                <Ionicons
                  name="globe-outline"
                  size={17}
                  color={Colors.primary}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.labelText, { color: Colors.primary }]}>
                {t('signup.password')}
              </Text>
              <View style={styles.inputText}>
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={17}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder={t('signup.passwordPlaceholder')}
                  style={styles.inputArabic}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Ionicons
                  name="lock-closed-outline"
                  size={17}
                  color={Colors.primary}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.labelText, { color: Colors.primary }]}>
                {t('signup.confirmPassword')}
              </Text>
              <View style={styles.inputText}>
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={17}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder={t('signup.confirmPasswordPlaceholder')}
                  style={styles.inputArabic}
                  secureTextEntry={!showPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <Ionicons
                  name="lock-closed-outline"
                  size={17}
                  color={Colors.primary}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.inputContainer}>
              <Text style={[styles.labelText, { color: Colors.primary }]}>
                {t('signup.firstName')}
              </Text>
              <View style={styles.inputText}>
                <Ionicons
                  name="person-outline"
                  size={17}
                  color={Colors.primary}
                />
                <TextInput
                  placeholder={t('signup.firstNamePlaceholder')}
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.labelText, { color: Colors.primary }]}>
                {t('signup.lastName')}
              </Text>
              <View style={styles.inputText}>
                <Ionicons
                  name="person-outline"
                  size={17}
                  color={Colors.primary}
                />
                <TextInput
                  placeholder={t('signup.lastNamePlaceholder')}
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.labelText, { color: Colors.primary }]}>
                {t('signup.username')}
              </Text>
              <View style={styles.inputText}>
                <Ionicons
                  name="person-outline"
                  size={17}
                  color={Colors.primary}
                />
                <TextInput
                  placeholder={t('signup.usernamePlaceholder')}
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.labelText, { color: Colors.primary }]}>
                {t('signup.email')}
              </Text>
              <View style={styles.inputText}>
                <Ionicons
                  name="mail-outline"
                  size={17}
                  color={Colors.primary}
                />
                <TextInput
                  placeholder={t('signup.email')}
                  style={styles.input}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.labelText, { color: Colors.primary }]}>
                {t('signup.country')}
              </Text>
              <View style={styles.inputText}>
                <Ionicons
                  name="globe-outline"
                  size={17}
                  color={Colors.primary}
                />
                <Picker
                  selectedValue={country}
                  style={styles.input}
                  onValueChange={(itemValue) => setCountry(itemValue)}
                >
                  {countries.map((country, index) => (
                                          <Picker.Item key={index} label={country} value={country} />
                                          ))}
                                        </Picker>
                                      </View>
                                    </View>
                                    <View style={styles.inputContainer}>
                                      <Text style={[styles.labelText, { color: Colors.primary }]}>
                                        {t('signup.password')}
                                      </Text>
                                      <View style={styles.inputText}>
                                        <Ionicons
                                          name="lock-closed-outline"
                                          size={17}
                                          color={Colors.primary}
                                        />
                                        <TextInput
                                          placeholder={t('signup.passwordPlaceholder')}
                                          style={styles.input}
                                          secureTextEntry={!showPassword}
                                          value={password}
                                          onChangeText={setPassword}
                                        />
                                        <TouchableOpacity onPress={togglePasswordVisibility}>
                                          <Ionicons
                                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                            size={17}
                                            color={Colors.primary}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                    <View style={styles.inputContainer}>
                                      <Text style={[styles.labelText, { color: Colors.primary }]}>
                                        {t('signup.confirmPassword')}
                                      </Text>
                                      <View style={styles.inputText}>
                                        <Ionicons
                                          name="lock-closed-outline"
                                          size={17}
                                          color={Colors.primary}
                                        />
                                        <TextInput
                                          placeholder={t('signup.confirmPasswordPlaceholder')}
                                          style={styles.input}
                                          secureTextEntry={!showPassword}
                                          value={confirmPassword}
                                          onChangeText={setConfirmPassword}
                                        />
                                        <TouchableOpacity onPress={togglePasswordVisibility}>
                                          <Ionicons
                                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                            size={17}
                                            color={Colors.primary}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </>
                                )}
                      
                                <TouchableOpacity
                                  style={[styles.button, { backgroundColor: Colors.primary }]}
                                  onPress={handleSignup}
                                >
                                  <Text style={[styles.buttonText, { color: Colors.white }]}>
                                    {t('signup.signUp')}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={styles.forgotPasswordButton}
                                  onPress={() => navigation.navigate('LoginScreen')}
                                >
                                  <Text style={styles.forgotPasswordText}>
                                    {t('signup.alreadyAccount')}{' '}
                                    <Text style={{ fontWeight: 'bold' }}>{t('signup.logIn')}</Text>
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </ScrollView>
                            <SuccessModal
                              visible={modalVisible}
                              onClose={handleCloseModal}
                              message={modalMessage}
                              navigation={navigation}
                            />
                          </SafeAreaView>
                        );
                      }
                      
