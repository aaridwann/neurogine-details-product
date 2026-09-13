import React, { useEffect } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { noop } from 'lodash';
import LottieView from 'lottie-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import GeneralText from '@Neurogine/ui-kit-general-text';
import { VARIANT } from '@Neurogine/ui-kit-general-text/dist/Constants';

import RefreshLottie from '../../Assets/Lottie/Refresh.json';

export interface ReloadScreenProps {
  onReload: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  lottieSource?: any;
}

// -----------------------------------------------------------------------------
// HELPER RENDERS (Di luar komponen utama & <15 baris per fungsi)
// -----------------------------------------------------------------------------

export const renderLottieAnimation = (source?: any) => (
  <View style={styles.lottieWrapper}>
    <LottieView
      autoPlay
      loop
      source={RefreshLottie}
      style={styles.lottie}
    />
  </View>
);

export const renderContentText = (title: string, description: string) => (
  <View style={styles.textContainer}>
    <GeneralText style={styles.title} variant={VARIANT.HEADLINE2}>
      {title}
    </GeneralText>
    <GeneralText style={styles.description} variant={VARIANT.BODY2}>
      {description}
    </GeneralText>
  </View>
);

export const renderReloadButton = (
  onPress: () => void,
  buttonText: string,
  scale: Animated.SharedValue<number>,
) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    onPress();
  };

  return (
    <Animated.View style={[styles.buttonWrapper, animatedStyle]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
      >
        <GeneralText style={styles.buttonText} variant={VARIANT.LABEL1}>
          {buttonText}
        </GeneralText>
      </Pressable>
    </Animated.View>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export const ReloadScreen: React.FC<ReloadScreenProps> = ({
  onReload = noop,
  title = 'Koneksi Terputus',
  description = 'Gagal memuat data. Silakan periksa koneksi internet Anda dan coba lagi.',
  buttonText = 'Coba Lagi',
  lottieSource,
  navigation,
}) => {
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    navigation?.setOptions({
      headerShown: false,
    });

    return () => {
      navigation?.setOptions({
        headerShown: true,
      });
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderLottieAnimation(lottieSource)}
        {renderContentText(title, description)}
        {renderReloadButton(onReload, buttonText, buttonScale)}
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------
// STYLES (Royal Blue Accent Palette)
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
    backgroundColor: '#558cc3ff',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
    width: '100%',
  },
  lottieWrapper: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
    width: 200,
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: '#e9e9e9ff',
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 32,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    justifyContent: 'center',
    paddingVertical: 14,
    shadowColor: 'rgba(0, 86, 148, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    // color: '#FFFFFF',
    color: '#426e9bff',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default ReloadScreen;