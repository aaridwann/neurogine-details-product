import { ReviewCard } from './CommentSection.component';
import { runSnapshotTests } from '../../Utils/Test/Test.utils';
describe('ReviewCard Component Snapshots', () => {
    const dummyReview = {
        rating: 5,
        comment: 'Sangat puas dengan kualitas produk ini! Pengiriman cepat.',
        date: '2026-09-14T10:00:00.000Z',
        reviewerName: 'Ahmad Fauzi',
        reviewerEmail: 'ahmad.fauzi@example.com',
    };
    const configs = [
        {
            desc: 'should match snapshot with complete review data and isLoading false',
            props: {
                isLoading: false,
                review: dummyReview,
            },
        },
        {
            desc: 'should match snapshot with decimal rating value',
            props: {
                isLoading: false,
                review: {
                    ...dummyReview,
                    rating: 4.5,
                },
            },
        },
        {
            desc: 'should match snapshot when isLoading is true with dummy review',
            props: {
                isLoading: true,
                review: dummyReview,
            },
        },
        {
            desc: 'should match snapshot when isLoading is true with empty review object',
            props: {
                isLoading: true,
                review: {
                    rating: 0,
                    comment: '',
                    date: '',
                    reviewerName: '',
                    reviewerEmail: '',
                },
            },
        },
        {
            desc: 'should match snapshot with minimum rating 0',
            props: {
                isLoading: false,
                review: {
                    ...dummyReview,
                    rating: 0,
                },
            },
        },
        {
            desc: 'should match snapshot with maximum rating 5',
            props: {
                isLoading: false,
                review: {
                    ...dummyReview,
                    rating: 5,
                },
            },
        },
        {
            desc: 'should match snapshot with out-of-bounds rating negative value',
            props: {
                isLoading: false,
                review: {
                    ...dummyReview,
                    rating: -1,
                },
            },
        },
        {
            desc: 'should match snapshot with out-of-bounds rating greater than 5',
            props: {
                isLoading: false,
                review: {
                    ...dummyReview,
                    rating: 10,
                },
            },
        },
        {
            desc: 'should match snapshot with empty string comment',
            props: {
                isLoading: false,
                review: {
                    ...dummyReview,
                    comment: '',
                },
            },
        },
        {
            desc: 'should match snapshot with extremely long comment text',
            props: {
                isLoading: false,
                review: {
                    ...dummyReview,
                    comment: 'Produk ini memiliki kualitas yang sangat memuaskan, bahan fleksibel, jahitan rapi, paking aman dengan bubble wrap tebal, pengiriman tepat waktu, serta layanan customer service yang sangat ramah dan responsif saat dihubungi.',
                },
            },
        },
        {
            desc: 'should match snapshot with long reviewer name and long email address',
            props: {
                isLoading: false,
                review: {
                    ...dummyReview,
                    reviewerName: 'Dr. Alexander Bartholomew Christopher III',
                    reviewerEmail: 'alexander.bartholomew.christopher.the.third@international-company.co.id',
                },
            },
        },
        {
            desc: 'should match snapshot with empty date string',
            props: {
                isLoading: false,
                review: {
                    ...dummyReview,
                    date: '',
                },
            },
        },
        {
            desc: 'should match snapshot with invalid date string format',
            props: {
                isLoading: false,
                review: {
                    ...dummyReview,
                    date: 'invalid-date-format',
                },
            },
        },
        {
            desc: 'should match snapshot with relative or formatted human-readable date',
            props: {
                isLoading: false,
                review: {
                    ...dummyReview,
                    date: '2 hari yang lalu',
                },
            },
        },
    ];
    runSnapshotTests(ReviewCard, configs);
});
