import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import GeneralText, { Constants } from '@Neurogine/ui-kit-general-text';
import styles from './CommentSection.component.styles';
import { formatDate } from '../../Utils/Data/Data.utils';
import Skeleton from '../Shimmering/Shimmering.component';
const { VARIANT } = Constants;
/**
 * getAvatarInitial
 * @param {string} name - inital name for avatar
 * @returns {string} - initial name
 */
const getAvatarInitial = (name) => {
    if (!name)
        return 'U';
    return name.charAt(0).toUpperCase();
};
/**
 * RatingStars
 * @param {number} rating - rating star
 * @returns {React.Component} - render stars
 */
const RatingStars = ({ rating }) => (_jsx(View, { style: styles.starRow, children: [1, 2, 3, 4, 5].map((star) => (_jsx(Ionicons, { color: star <= rating ? '#F59E0B' : '#E2E8F0', name: star <= rating ? 'star' : 'star-outline', size: 14 }, star))) }));
/**
 * Render Avatar
 * @param {string} reviewerName - reviewe name
 * @param {boolean} isLoading - Loading
 * @returns {ReactNode} - Render Avatar
 */
const _renderAvatar = (reviewerName, isLoading) => (_jsx(View, { style: styles.avatar, children: isLoading ? (_jsx(Skeleton, { width: 36, height: 36, borderRadius: 18 })) : (_jsx(GeneralText, { style: styles.avatarText, variant: VARIANT.LABEL3, children: getAvatarInitial(reviewerName) })) }));
/**
 * Render name and date
 * @param {string} reviewerName - reviewe name
 * @param {string} date - review date
 * @param {boolean} isLoading - Loading
 * @returns {ReactNode} - Render name and date
 */
const _renderName = (reviewerName, date, isLoading) => (_jsxs(View, { style: styles.authorInfo, children: [isLoading ?
            _jsx(Skeleton, { style: { marginBottom: 4 }, width: 60, height: 10, borderRadius: 8 }) :
            _jsx(GeneralText, { style: styles.authorName, variant: VARIANT.LABEL2, children: reviewerName }), isLoading ? _jsx(Skeleton, { width: '35%', height: 12, borderRadius: 8 }) :
            _jsx(GeneralText, { style: styles.dateText, variant: VARIANT.LABEL3, children: formatDate(date) })] }));
/**
 * Render stars
 * @param {number} rating - Rating count
 * @param {boolean} isLoading - IsLoading
 * @returns {ReactNode} - Render stars
 */
const _renderStars = (rating, isLoading) => (_jsx(View, { style: styles.starsWrapper, children: isLoading ?
        _jsx(Skeleton, { width: 75, height: 12, borderRadius: 8 }) :
        _jsx(RatingStars, { rating: rating }) }));
/**
 * Render comment
 * @param {string} comment - Comment text
 * @param {boolean} isLoading - IsLoading
 * @returns {ReactNode} - Render comment
 */
const _renderComment = (comment, isLoading) => (_jsx(GeneralText, { style: styles.commentText, variant: VARIANT.BODY2, children: isLoading ?
        _jsx(Skeleton, { style: { marginTop: 4 }, width: 100, height: 10, borderRadius: 8 }) : comment }));
/**
 * ReviewCard
 * @param {Object} props - The component props.
 * @param {Object} props.review - The review object.
 * @param {boolean} props.isLoading - IsLoading
 * @returns {ReactNode} - Render review card
 */
export const ReviewCard = ({ review, isLoading }) => (_jsxs(View, { style: styles.card, children: [_jsxs(View, { style: styles.headerRow, children: [_renderAvatar(review.reviewerName, isLoading), _renderName(review.reviewerName, review.date, isLoading), _renderStars(review.rating, isLoading)] }), _renderComment(review.comment, isLoading)] }));
