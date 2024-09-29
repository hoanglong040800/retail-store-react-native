import { View } from 'react-native';
import { DeModal } from 'components';
import { EditTodoForm, ITodo } from './core/todo.interface';
import TodoItem from './TodoItem';
import EditTodoContext from './form/EditTodoContent';

type Props = {
  list: ITodo[];
  editingItem: ITodo;
  isOpenEditModal: boolean;
  onOpenEditModal: (item: ITodo) => void;
  onCloseEditModal: () => void;
  editTodo: (item: EditTodoForm) => void;
  deleteTodo: (id: string) => void;
};

const TodoList = ({
  list,
  editingItem,
  isOpenEditModal,
  onOpenEditModal,
  onCloseEditModal,
  editTodo,
  deleteTodo,
}: Props) => {
  return (
    <View>
      {list.map(i => (
        <TodoItem
          key={i.id}
          title={i.title}
          description={i.description}
          onClickEdit={() => onOpenEditModal(i)}
          onClickDelete={() => deleteTodo(i.id)}
        />
      ))}

      <DeModal isOpen={isOpenEditModal} onClose={onCloseEditModal} hideHeader>
        <EditTodoContext onClose={onCloseEditModal} initialState={editingItem} editTodo={editTodo} />
      </DeModal>
    </View>
  );
};

export default TodoList;
