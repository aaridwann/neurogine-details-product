import { StyleSheet } from 'react-native';

// import { HEADER_HEIGHT } from './Header.helper';

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F1F5F9',
  },
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 12,
  },
  titleText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitleText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  rightActionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  badge: {
    backgroundColor: '#EF4444',
    borderRadius: 4,
    height: 8,
    position: 'absolute',
    right: 10,
    top: 10,
    width: 8,
  },
  lottieContainer: {
    height: 50,
    position: 'absolute',
    right: -12,
    top: -12,
    width: 50,
  },
  lottie: { height: '100%', width: '100%' },
});

export default styles;