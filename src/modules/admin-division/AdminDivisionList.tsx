import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { AdminDivisionDto } from 'types';

type Props = ScrollViewProps & {
  adminDivisions: AdminDivisionDto[];
  onSelectAdminDivision: (adminDivision: AdminDivisionDto) => void;
};

const AdminDivisionList = ({ adminDivisions, onSelectAdminDivision, ...props }: Props) => {
  if (!adminDivisions) {
    return <ActivityIndicator animating />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContentContainer} {...props}>
      {adminDivisions.map(adminDivision => (
        <Button key={adminDivision.id} mode="outlined" onPress={() => onSelectAdminDivision(adminDivision)}>
          {adminDivision.fullname}
        </Button>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContentContainer: {
    flex: 1,
    gap: 16,
  },
});

export default AdminDivisionList;
