import ImageSlider from './ImageSlider.component';
import { runSnapshotTests } from '../../Utils/Test/Test.utils';
describe('Image Slider Component Snapshots', () => {
    const dummySliders = [
        {
            id: 'slider-1',
            image: 'https://example.com/slide1.jpg',
            title: 'Promo Spesial Elekronik',
            subtitle: 'Diskon hingga 50% untuk produk pilihan',
        },
        {
            id: 'slider-2',
            image: 'https://example.com/slide2.jpg',
            title: 'Koleksi Fashion Terbaru',
            subtitle: 'Tampil bergaya dengan tren terkini',
        },
        {
            id: 'slider-3',
            image: 'https://example.com/slide3.jpg',
        },
    ];
    const configs = [
        {
            desc: 'should match snapshot with empty props',
            props: {
                data: [],
            },
        },
        {
            desc: 'should match snapshot when isLoading is true',
            props: {
                data: [],
                isLoading: true,
            },
        },
        {
            desc: 'should match snapshot when isLoading is true with existing data',
            props: {
                data: dummySliders,
                isLoading: true,
            },
        },
        {
            desc: 'should match snapshot with valid sliders data and isLoading false',
            props: {
                data: dummySliders,
                isLoading: false,
            },
        },
        {
            desc: 'should match snapshot with single slider item',
            props: {
                data: [dummySliders[0]],
                isLoading: false,
            },
        },
        {
            desc: 'should match snapshot with custom autoPlayInterval',
            props: {
                data: dummySliders,
                autoPlayInterval: 5000,
            },
        },
        {
            desc: 'should match snapshot with autoPlayInterval set to 0 (disabled)',
            props: {
                data: dummySliders,
                autoPlayInterval: 0,
            },
        },
        {
            desc: 'should match snapshot with slider items missing title and subtitle',
            props: {
                data: [
                    {
                        id: 'minimal-1',
                        image: 'https://example.com/minimal.jpg',
                    },
                ],
            },
        },
        {
            desc: 'should match snapshot with slider item having title only without subtitle',
            props: {
                data: [
                    {
                        id: 'title-only-1',
                        image: 'https://example.com/title-only.jpg',
                        title: 'Title Without Subtitle',
                    },
                ],
            },
        },
        {
            desc: 'should match snapshot with slider item having subtitle only without title',
            props: {
                data: [
                    {
                        id: 'subtitle-only-1',
                        image: 'https://example.com/subtitle-only.jpg',
                        subtitle: 'Subtitle Without Title',
                    },
                ],
            },
        },
        {
            desc: 'should match snapshot with empty string values in slider item properties',
            props: {
                data: [
                    {
                        id: 'empty-strings-1',
                        image: '',
                        title: '',
                        subtitle: '',
                    },
                ],
            },
        },
        {
            desc: 'should match snapshot with extremely long title and subtitle text',
            props: {
                data: [
                    {
                        id: 'long-text-1',
                        image: 'https://example.com/long-text.jpg',
                        title: 'Extremely Long Promotional Banner Title Designed To Test Text Wrapping And Overlay Bounds In Image Slider',
                        subtitle: 'Super Long Subtitle Content Explaining Detailed Terms And Conditions For This Flash Sale Promo Banner',
                    },
                ],
            },
        },
        {
            desc: 'should match snapshot with large dataset of slider items',
            props: {
                data: Array.from({ length: 10 }, (_, index) => ({
                    id: `banner-${index + 1}`,
                    image: `https://example.com/banner-${index + 1}.jpg`,
                    title: `Banner ${index + 1}`,
                })),
            },
        },
    ];
    runSnapshotTests(ImageSlider, configs);
});
