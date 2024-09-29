import { ScrollView } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { AdminDivisionDto } from 'types';

type Props = {
  adminDivisions: AdminDivisionDto[];
  onSelectAdminDivision: (adminDivision: AdminDivisionDto) => void;
};

const AdminDivisionList = ({ adminDivisions, onSelectAdminDivision }: Props) => {
  if (!adminDivisions) {
    return <ActivityIndicator animating />;
  }

  return (
    <ScrollView>
      {adminDivisions.map(adminDivision => (
        <Button key={adminDivision.id} mode="outlined" onPress={() => onSelectAdminDivision(adminDivision)}>
          {adminDivision.fullname}
        </Button>
      ))}
    </ScrollView>
  );
};

export default AdminDivisionList;
