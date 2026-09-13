import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F8FAFC',
        borderColor: '#F1F5F9',
        borderRadius: 12,
        borderWidth: 1,
        gap: 10,
        padding: 14,
    },
    headerRow: { alignItems: 'center', flexDirection: 'row', gap: 10 },
    avatar: {
        alignItems: 'center',
        backgroundColor: '#0F172A',
        borderRadius: 18,
        height: 36,
        justifyContent: 'center',
        width: 36,
    },
    avatarText: { color: '#FFFFFF', fontWeight: '700' },
    authorInfo: { flex: 1 },
    authorName: { color: '#0F172A', fontWeight: '600' },
    dateText: { color: '#94A3B8', marginTop: 1 },
    commentText: { color: '#334155', lineHeight: 20 },
    starRow: { flexDirection: 'row', gap: 2 },
    starsWrapper: { justifyContent: 'center', alignItems: 'center' },
});
export default styles;
