import React from 'react';

import { StyleSheet, View } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import GeneralText from '@Neurogine/ui-kit-general-text';
import { VARIANT } from '@Neurogine/ui-kit-general-text/dist/Constants';

import Skeleton from '../Shimmering/Shimmering.component';

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface CommentSectionProps {
  reviews: Review[];
}

/**
 * Format ISO Date string ke format tanggal elegan (e.g. "30 Apr 2025")
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Mendapatkan inisial nama reviewer untuk Avatar Placeholder
 */
export const getAvatarInitial = (name: string): string => {
  if (!name) return 'U';

  return name.charAt(0).toUpperCase();
};

export const RatingStars: React.FC<{ rating: number }> = ({ rating }) => (
  <View style={styles.starRow}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Ionicons
        color={star <= rating ? '#F59E0B' : '#E2E8F0'}
        key={star}
        name={star <= rating ? 'star' : 'star-outline'}
        size={14}
      />
    ))}
  </View>
);

const _renderAvatar = (reviewerName: string, isLoading: boolean) => (
  <View style={styles.avatar}>
    {isLoading ? (
      <Skeleton width={36} height={36} borderRadius={18} />
    ) : (
      <GeneralText style={styles.avatarText} variant={VARIANT.LABEL3}>
        {getAvatarInitial(reviewerName)}
      </GeneralText>
    )}
  </View>
);

const _renderName = (reviewerName: string, date: string, isLoading: boolean) => (
  <View style={styles.authorInfo}>
    {isLoading ?
      <Skeleton style={{ marginBottom: 4 }} width={60} height={10} borderRadius={8} /> :

      <GeneralText style={styles.authorName} variant={VARIANT.LABEL2}>
        {reviewerName}
      </GeneralText>}
    {isLoading ?
      <Skeleton width={'35%'} height={12} borderRadius={8} /> :
      <GeneralText style={styles.dateText} variant={VARIANT.LABEL3}>
        {formatDate(date)}
      </GeneralText>}

  </View>
);

const _renderStars = (rating: number, isLoading: boolean) => (
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    {isLoading ?
      <Skeleton width={75} height={12} borderRadius={8} /> :
      <RatingStars rating={rating} />}
  </View>
);

const _renderComment = (comment: string, isLoading: boolean) => (
  <GeneralText style={styles.commentText} variant={VARIANT.BODY2}>
    {isLoading ? <Skeleton style={{ marginTop: 4 }} width={100} height={10} borderRadius={8} /> : comment}
  </GeneralText>
);

export const ReviewCard: React.FC<{ review: Review, isLoading: boolean }> =
  ({ review, isLoading }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        {_renderAvatar(review.reviewerName, isLoading)}
        {_renderName(review.reviewerName, review.date, isLoading)}
        {_renderStars(review.rating, isLoading)}
      </View>
      {_renderComment(review.comment, isLoading)}
    </View>
  );

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
});