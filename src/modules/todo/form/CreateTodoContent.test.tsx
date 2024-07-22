import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import CreateTodoContent from './CreateTodoContent';

type Props = ComponentProps<typeof CreateTodoContent>;

jest.mock('components/input/DeTextInput.tsx', () => props => <div data-testid="DeTextInput" {...props} />);

jest.mock('components/appbar', () => ({
  DeAppBar: () => <div data-testid="DeAppBar" />,
}));

const mockValueUseCreateTodo = {
  control: 'mockControl',
  errors: 'mockErrors',
  onClickSubmit: jest.fn(),
};

// UT: mock hook
jest.mock('modules/todo/hooks/useCreateTodo', () => ({
  useCreateTodo: () => {
    return mockValueUseCreateTodo;
  },
}));

const defaultProps: Props = {
  onCreateTodo: () => null,
  onClose: () => null,
};

const renderComponent = (props: Props = defaultProps) => render(<CreateTodoContent {...props} />);

describe('CreateTodoCotent', () => {
  // UT: test component props
  it('should render correct components by default', () => {
    const { queryByTestId, queryAllByTestId } = renderComponent();
    const [titleInput, descriptionInput] = queryAllByTestId('DeTextInput');

    expect(titleInput.getAttribute('name')).toBe('title');
    expect(descriptionInput.getAttribute('name')).toBe('description');
    expect(queryByTestId('DeAppBar')).toBeTruthy();
  });
});
