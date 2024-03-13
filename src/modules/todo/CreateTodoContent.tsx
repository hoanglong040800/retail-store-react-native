import { object } from 'yup';
import { DeAppBar, DeTextInput, useSnackbar } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateTodoForm } from './todo.interface';
import { createTodoSchema } from './todo.schema';

type Props = {
  onClose: () => void;
};

const resolvedSchema = yupResolver(object(createTodoSchema));

const CreateTodoContent = ({ onClose }: Props) => {
  const { openSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<CreateTodoForm>({ resolver: resolvedSchema });

  const onValidSubmit = (formData: CreateTodoForm) => {
    console.log(formData);
    openSnackbar('success', 'Create todo successfully');
  };

  const onInvalidSubmit = () => {
    openSnackbar('error', 'Create todo fail');
  };

  return (
    <>
      <DeAppBar
        title="Create Todo"
        primaryText="Save"
        onPressPrimary={handleSubmit(onValidSubmit, onInvalidSubmit)}
        onPressSecondary={onClose}
      />

      <DeTextInput control={control} name="title" label="Title" />

      <DeTextInput control={control} name="description" label="Description" />
    </>
  );
};

export default CreateTodoContent;
