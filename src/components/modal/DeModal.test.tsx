import { ComponentProps } from 'react';
import { render } from '@testing-library/react';

import DeModal from './DeModal';

type Props = ComponentProps<typeof DeModal>;

// UT: mock component
jest.mock('../appbar', () => ({
  DeAppBar: () => <div data-testid="DeAppBar" />,
}));

// UT: mock export default component
jest.mock('react-native', () => ({
  Modal: ({ children }) => <div data-testid="Modal">{children}</div>,
}));

const defaultProps: Props = { isOpen: true, onClose: () => null, children: null };

const renderComponent = (props: Props = defaultProps) => render(<DeModal {...props}>{props.children}</DeModal>);

describe('DeModal', () => {
  // UT: test component
  it('should render correct components', () => {
    const { queryByTestId } = renderComponent();

    expect(queryByTestId('DeAppBar')).toBeTruthy();
  });

  it('should not render DeAppBar', () => {
    const { queryByTestId } = renderComponent({ ...defaultProps, isHideHeader: true });

    expect(queryByTestId('DeAppBar')).toBeFalsy();
  });
});
