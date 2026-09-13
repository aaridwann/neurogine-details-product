import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9', width: 160, overflow: 'hidden' },
    imageSkeleton: { width: '100%', height: 140, backgroundColor: '#E2E8F0' },
    content: { padding: 10, gap: 8 },
    textSkeletonShort: { width: 60, height: 10, backgroundColor: '#E2E8F0', borderRadius: 4 },
    textSkeletonLong: { width: '100%', height: 12, backgroundColor: '#E2E8F0', borderRadius: 4 },
    textSkeletonPrice: { width: 80, height: 14, backgroundColor: '#E2E8F0', borderRadius: 4 },
});
export default styles;
