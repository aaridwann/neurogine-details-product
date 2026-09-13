import Shimmering from './Shimmering.component';
import { runSnapshotTests } from '../../Utils/Test/Test.utils';
describe('Shimmering Component Snapshots', () => {
    const customViewStyle = {
        marginTop: 12,
        marginBottom: 8,
        marginHorizontal: 16,
        backgroundColor: '#E0E0E0',
        opacity: 0.8,
    };
    const configs = [
        {
            desc: 'should match snapshot with default empty props',
            props: {},
        },
        {
            desc: 'should match snapshot with numeric width and height',
            props: {
                width: 200,
                height: 24,
            },
        },
        {
            desc: 'should match snapshot with width only',
            props: {
                width: 150,
            },
        },
        {
            desc: 'should match snapshot with height only',
            props: {
                height: 50,
            },
        },
        {
            desc: 'should match snapshot with percentage string width (100%)',
            props: {
                width: '100%',
                height: 16,
            },
        },
        {
            desc: 'should match snapshot with partial percentage string width (50%)',
            props: {
                width: '50%',
                height: 20,
            },
        },
        {
            desc: 'should match snapshot with custom borderRadius',
            props: {
                width: 100,
                height: 100,
                borderRadius: 12,
            },
        },
        {
            desc: 'should match snapshot with fully rounded shape (circle)',
            props: {
                width: 48,
                height: 48,
                borderRadius: 24,
            },
        },
        {
            desc: 'should match snapshot with zero borderRadius',
            props: {
                width: 120,
                height: 40,
                borderRadius: 0,
            },
        },
        {
            desc: 'should match snapshot with custom style prop',
            props: {
                style: customViewStyle,
            },
        },
        {
            desc: 'should match snapshot with all props provided (width, height, borderRadius, style)',
            props: {
                width: '80%',
                height: 32,
                borderRadius: 8,
                style: customViewStyle,
            },
        },
        {
            desc: 'should match snapshot with zero dimensions',
            props: {
                width: 0,
                height: 0,
                borderRadius: 0,
            },
        },
        {
            desc: 'should match snapshot with small decimal percentage width',
            props: {
                width: '33.3%',
                height: 14,
            },
        },
    ];
    runSnapshotTests(Shimmering, configs);
});
