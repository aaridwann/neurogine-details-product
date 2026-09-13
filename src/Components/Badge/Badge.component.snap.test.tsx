import renderer from 'react-test-renderer';

jest
  .mock('@Neurogine/ui-kit-general-text', () => {
    const { Text } = jest.requireActual('react-native');

    const MockGeneralText = (props: any) => {
      return <Text {...props}>{props.children}</Text>;
    };

    return {
      __esModule: true,
      default: MockGeneralText,
      Constants: {
        VARIANT: {
          LABEL1: 'LABEL1',
          LABEL2: 'LABEL2',
          LABEL3: 'LABEL3',
        },
      },
    };
  });

import BadgeTextComponent from './Badge.component';

describe('BadgeTextComponent Snapshot', () => {
  const configs = [
    {
      props: { text: 'Active' },
      description: 'should match snapshot with default props',
    },
    {
      props: { text: 'Inactive' },
      description: 'should match snapshot with inactive props',
    },
    {
      props: {
        text: 'Custom',
        color: '#1b60ff',
        backgroundColor: '#84060a',
        style: { padding: 10, borderRadius: 5 },
      },
      description: 'should match snapshot with custom props',
    },
  ];

  configs.forEach(({ props, description }) => {
    it(description, () => {
      let component: renderer.ReactTestRenderer;

      renderer.act(() => {
        component = renderer.create(<BadgeTextComponent {...props} />);
      });

      const tree = component!.toJSON();

      expect(tree).not.toBeNull();
      expect(tree).toMatchSnapshot();
    });
  });
});