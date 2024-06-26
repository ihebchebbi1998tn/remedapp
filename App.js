import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RootNavigator from './Navigation/RootNavigator';
import i18n from "./i18n";
import { I18nextProvider } from 'react-i18next'; // Make sure to import I18nextProvider
import { TranslationProvider } from './Navigation/TranslationContext';
import { LanguageProvider } from "./Navigation/LanguageContext";
import { UserProvider } from './Navigation/UserContext';
const Stack = createStackNavigator();

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <TranslationProvider>
        <UserProvider>
          <LanguageProvider>
            <RootNavigator />
          </LanguageProvider>
        </UserProvider>
      </TranslationProvider>
    </I18nextProvider>
  );
};

export default App;
