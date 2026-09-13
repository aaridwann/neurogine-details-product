import { Text } from 'react-native';

import BottomSheet from './BottomSheet.component';
import { runSnapshotTests } from '../../Utils/Test/Test.utils';

describe('BottomSheet component', () => {
  const configs = [
    {
      props: {},
      desc: 'should match snapshot with default props',
    },
    {
      props: {
        title: 'Bottom Sheet Title',
        showCloseButton: true,
        onClosePress: jest.fn(),
        children: <Text>Bottom Sheet Content</Text>,
      },
      desc: 'should match snapshot with title and close button',
    },
    {
      props: {
        title: 'Bottom Sheet Title',
        showCloseButton: false,
        children: <Text>Bottom Sheet Content</Text>,
      },
      desc: 'should match snapshot with title and no close button',
    },
  ];

  runSnapshotTests(BottomSheet, configs);
});
