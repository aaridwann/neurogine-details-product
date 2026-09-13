import Header from './Header.component';
import { runSnapshotTests } from '../../Utils/Test/Test.utils';
describe('Header Component Snapshots', () => {
    const configs = [
        {
            desc: 'should match snapshot with default empty props',
            props: {},
        },
        {
            desc: 'should match snapshot with title only',
            props: {
                title: 'Title Only',
            },
        },
        {
            desc: 'should match snapshot with title and subtitle',
            props: {
                title: 'Main Title',
                subtitle: 'Secondary Subtitle',
            },
        },
        {
            desc: 'should match snapshot with subtitle only without title',
            props: {
                subtitle: 'Subtitle Without Main Title',
            },
        },
        {
            desc: 'should match snapshot with onBackPress handler',
            props: {
                title: 'Header With Back Button',
                onBackPress: jest.fn(),
            },
        },
        {
            desc: 'should match snapshot with onNotificationPress handler without badge',
            props: {
                title: 'Header With Notification',
                onNotificationPress: jest.fn(),
                showNotificationBadge: false,
            },
        },
        {
            desc: 'should match snapshot with onNotificationPress and showNotificationBadge true',
            props: {
                title: 'Header With Notification Badge',
                onNotificationPress: jest.fn(),
                showNotificationBadge: true,
            },
        },
        {
            desc: 'should match snapshot with all action buttons and handlers enabled',
            props: {
                title: 'Full Action Header',
                subtitle: 'Includes Back and Notification',
                onBackPress: jest.fn(),
                onNotificationPress: jest.fn(),
                showNotificationBadge: true,
            },
        },
        {
            desc: 'should match snapshot with showNotificationBadge true but no onNotificationPress',
            props: {
                title: 'Badge Only',
                showNotificationBadge: true,
            },
        },
        {
            desc: 'should match snapshot with empty string title and subtitle',
            props: {
                title: '',
                subtitle: '',
            },
        },
        {
            desc: 'should match snapshot with extremely long title and subtitle',
            props: {
                title: 'Very Long Header Title That Might Cause Overflow Or Need Truncation Behavior',
                subtitle: 'Extremely Long Subtitle Text Designed To Test Multi Line Or Single Line Truncation In Mobile UI',
                onBackPress: jest.fn(),
                onNotificationPress: jest.fn(),
                showNotificationBadge: true,
            },
        },
    ];
    runSnapshotTests(Header, configs);
});
