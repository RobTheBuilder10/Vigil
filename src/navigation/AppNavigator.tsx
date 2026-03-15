import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../theme';
import { useApp } from '../context/AppContext';

// Screens
import { OnboardingScreen } from '../screens/Onboarding/OnboardingScreen';
import { WatchtowerScreen } from '../screens/Watchtower/WatchtowerScreen';
import { BibleScreen } from '../screens/Bible/BibleScreen';
import { ChapterViewScreen } from '../screens/Bible/ChapterViewScreen';
import { VigilScreen } from '../screens/Vigil/VigilScreen';
import { ArsenalScreen } from '../screens/Arsenal/ArsenalScreen';
import { FlashcardsScreen } from '../screens/Arsenal/FlashcardsScreen';
import { BattleModeScreen } from '../screens/Battle/BattleModeScreen';
import { BrotherhoodScreen } from '../screens/Brotherhood/BrotherhoodScreen';
import { MissionsScreen } from '../screens/Missions/MissionsScreen';
import { PrayerJournalScreen } from '../screens/Prayer/PrayerJournalScreen';
import { AudioScreen } from '../screens/Audio/AudioScreen';
import { PremiumScreen } from '../screens/Premium/PremiumScreen';
import { MoreScreen } from '../screens/More/MoreScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MoreStack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.background },
};

function MoreStackNavigator() {
  return (
    <MoreStack.Navigator screenOptions={screenOptions}>
      <MoreStack.Screen name="MoreHome" component={MoreScreen} />
      <MoreStack.Screen name="BattleMode" component={BattleModeScreen} />
      <MoreStack.Screen name="Brotherhood" component={BrotherhoodScreen} />
      <MoreStack.Screen name="Missions" component={MissionsScreen} />
      <MoreStack.Screen name="PrayerJournal" component={PrayerJournalScreen} />
      <MoreStack.Screen name="Audio" component={AudioScreen} />
      <MoreStack.Screen name="Premium" component={PremiumScreen} />
    </MoreStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.bronze,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          ...typography.labelSmall,
          fontSize: 9,
          marginTop: 2,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'help-outline';
          switch (route.name) {
            case 'Watchtower':
              iconName = 'radio-outline';
              break;
            case 'Bible':
              iconName = 'book-outline';
              break;
            case 'TheVigil':
              iconName = 'flame-outline';
              break;
            case 'Arsenal':
              iconName = 'shield-outline';
              break;
            case 'More':
              iconName = 'grid-outline';
              break;
          }
          return <Ionicons name={iconName as any} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Watchtower"
        component={WatchtowerScreen}
        options={{ tabBarLabel: 'WATCH' }}
      />
      <Tab.Screen
        name="Bible"
        component={BibleScreen}
        options={{ tabBarLabel: 'SCRIPTURE' }}
      />
      <Tab.Screen
        name="TheVigil"
        component={VigilScreen}
        options={{ tabBarLabel: 'VIGIL' }}
      />
      <Tab.Screen
        name="Arsenal"
        component={ArsenalScreen}
        options={{ tabBarLabel: 'ARSENAL' }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackNavigator}
        options={{ tabBarLabel: 'MORE' }}
      />
    </Tab.Navigator>
  );
}

export const AppNavigator: React.FC = () => {
  const { onboardingComplete } = useApp();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {!onboardingComplete ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="ChapterView" component={ChapterViewScreen} />
          <Stack.Screen name="ArsenalFlashcards" component={FlashcardsScreen} />
          <Stack.Screen name="BattleMode" component={BattleModeScreen} />
          <Stack.Screen name="Premium" component={PremiumScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
