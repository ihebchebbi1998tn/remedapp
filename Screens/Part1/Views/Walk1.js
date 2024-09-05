import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import useWalkViewModel from '../ViewModels/WalkViewModel';
import styles from '../Styles/StyleWalk';
import Colors from '../../../utils/color';
import ImageResources from '../../../utils/ImageRessources';
const image1 = ImageResources.RemedLogo;
const image2 = ImageResources.EUlogo;
const cleanerEnvImage = ImageResources.Walk3;
const walk2Image = ImageResources.Walk2;
const mapImage = ImageResources.WalkLocalisation;
import { SafeAreaView } from 'react-native-safe-area-context';

const Walk1 = ({ navigation }) => {
  const { t } = useTranslation();
  const { navigateToNextScreen } = useWalkViewModel(navigation);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image1} resizeMode="cover" style={styles.imageSmall} />
          <Image source={image2} resizeMode="cover" style={styles.imageSmall} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t('Welcome to RE-MED Community')}</Text>
          <Text style={styles.description}>{t('GetReady')}</Text>
        </View>
        <Footer navigation={navigation} nextScreen="Walk2" activeDotIndex={0} navigateToNextScreen={navigateToNextScreen} />
      </View>
    </SafeAreaView>
  );
};

const Walk2 = ({ navigation }) => {
  const { t } = useTranslation();
  const { navigateToNextScreen } = useWalkViewModel(navigation);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={walk2Image} resizeMode="cover" style={styles.imageMedium} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("Reporting Made Easy")}</Text>
          <Text style={styles.description}>{t("With RE-MED, reporting construction")}</Text>
        </View>
        <Footer navigation={navigation} nextScreen="Walk3" activeDotIndex={1} navigateToNextScreen={navigateToNextScreen} />
      </View>
    </SafeAreaView>
  );
};

const Walk3 = ({ navigation }) => {
  const { t } = useTranslation();
  const { navigateToNextScreen } = useWalkViewModel(navigation);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={cleanerEnvImage} resizeMode="cover" style={styles.imageLarge} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t('Building a Cleaner Future')}</Text>
          <Text style={styles.description}>{t('Congratulations')}</Text>
        </View>
        <Footer navigation={navigation} nextScreen="Walk4" activeDotIndex={2} navigateToNextScreen={navigateToNextScreen} />
      </View>
    </SafeAreaView>
  );
};

const Walk4 = ({ navigation }) => {
  const { t } = useTranslation();
  const { handleLocationPermission } = useWalkViewModel(navigation);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={mapImage} resizeMode="cover" style={styles.imageLarge} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t('ENABLE YOUR LOCATION')}</Text>
        </View>
        <View style={styles.footer}>
          <LinearGradient colors={[Colors.primary, Colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
            <TouchableOpacity style={styles.nextButton} onPress={handleLocationPermission}>
              <Text style={styles.nextButtonText}>{t('Use my location')}</Text>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity style={styles.outlinedButton} onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.outlinedButtonText}>{t('Skip for now')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Footer = ({ navigation, nextScreen, activeDotIndex, navigateToNextScreen }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.dotsContainer}>
        {[0, 1, 2].map((index) => (
          <View key={index} style={[styles.dot, index === activeDotIndex && styles.activeDot]}></View>
        ))}
      </View>
      <LinearGradient colors={[Colors.primary,Colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigateToNextScreen(nextScreen, activeDotIndex + 1)}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export { Walk1, Walk2, Walk3, Walk4};