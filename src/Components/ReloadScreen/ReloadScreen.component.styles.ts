import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#558cc3ff',
    flex: 1,
    justifyContent: 'center',
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
    gap: 8,
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
    color: '#426e9bff',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default styles;