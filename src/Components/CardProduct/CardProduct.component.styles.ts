import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9', width: 160, overflow: 'hidden' },
  image: { width: '100%', height: 140, backgroundColor: '#F8FAFC' },
  content: { padding: 10, gap: 3 },
  brand: { color: '#94A3B8', fontSize: 10, fontWeight: '500' },
  title: { color: '#0F172A', fontWeight: '600' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  price: { color: '#0F172A', fontWeight: '700' },
  originalPrice: { color: '#94A3B8', textDecorationLine: 'line-through', fontSize: 10 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  ratingText: { color: '#475569', fontWeight: '600', fontSize: 11 },
});

export default styles;