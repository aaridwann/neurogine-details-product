import React, { type ReactNode } from 'react';

import { View } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import GeneralText from '@Neurogine/ui-kit-general-text';
import { VARIANT } from '@Neurogine/ui-kit-general-text/dist/Constants';

import styles from './CommentSection.component.styles';
import { formatDate } from '../../Utils/Data/Data.utils';
import Skeleton from '../Shimmering/Shimmering.component';

import type { ReviewProductType } from '../../Types';

/**
 * getAvatarInitial
 * @param {string} name - inital name for avatar
 * @returns {string} - initial name
 */
const getAvatarInitial = (name: string): string => {
  if (!name) return 'U';

  return name.charAt(0).toUpperCase();
};

/**
 * RatingStars
 * @param {number} rating - rating star
 * @returns {React.Component} - render stars
 */
const RatingStars: React.FC<{ rating: number }> = ({ rating }): ReactNode => (
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

/**
 * Render Avatar
 * @param {string} reviewerName - reviewe name
 * @param {boolean} isLoading - Loading
 * @returns {ReactNode} - Render Avatar
 */
const _renderAvatar = (reviewerName: string, isLoading: boolean): ReactNode => (
  <View style={styles.avatar}>
    {isLoading ? (<Skeleton width={36} height={36} borderRadius={18} />) : (
      <GeneralText style={styles.avatarText} variant={VARIANT.LABEL3}>
        {getAvatarInitial(reviewerName)}
      </GeneralText>
    )}
  </View>
);

/**
 * Render name and date
 * @param {string} reviewerName - reviewe name
 * @param {string} date - review date
 * @param {boolean} isLoading - Loading
 * @returns {ReactNode} - Render name and date
 */
const _renderName = (reviewerName: string, date: string, isLoading: boolean): ReactNode => (
  <View style={styles.authorInfo}>
    {isLoading ?
      <Skeleton style={{ marginBottom: 4 }} width={60} height={10} borderRadius={8} /> :
      <GeneralText style={styles.authorName} variant={VARIANT.LABEL2}>{reviewerName}</GeneralText>}
    {isLoading ? <Skeleton width={'35%'} height={12} borderRadius={8} /> :
      <GeneralText style={styles.dateText} variant={VARIANT.LABEL3}>
        {formatDate(date)}
      </GeneralText>}
  </View>
);

/**
 * Render stars
 * @param {number} rating - Rating count
 * @param {boolean} isLoading - IsLoading
 * @returns {ReactNode} - Render stars
 */
const _renderStars = (rating: number, isLoading: boolean): ReactNode => (
  <View style={styles.starsWrapper}>
    {isLoading ?
      <Skeleton width={75} height={12} borderRadius={8} /> :
      <RatingStars rating={rating} />}
  </View>
);

/**
 * Render comment
 * @param {string} comment - Comment text
 * @param {boolean} isLoading - IsLoading
 * @returns {ReactNode} - Render comment
 */
const _renderComment = (comment: string, isLoading: boolean): ReactNode => (
  <GeneralText style={styles.commentText} variant={VARIANT.BODY2}>
    {isLoading ?
      <Skeleton style={{ marginTop: 4 }} width={100} height={10} borderRadius={8} /> : comment}
  </GeneralText>
);

/**
 * ReviewCard
 * @param {Object} props - The component props.
 * @param {Object} props.review - The review object.
 * @param {boolean} props.isLoading - IsLoading
 * @returns {ReactNode} - Render review card
 */
export const ReviewCard: React.FC<{ review: ReviewProductType, isLoading: boolean }> =
  ({ review, isLoading }): ReactNode => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        {_renderAvatar(review.reviewerName, isLoading)}
        {_renderName(review.reviewerName, review.date, isLoading)}
        {_renderStars(review.rating, isLoading)}
      </View>
      {_renderComment(review.comment, isLoading)}
    </View>
  );
