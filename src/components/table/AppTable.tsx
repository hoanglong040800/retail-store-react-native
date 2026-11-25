import { BASE_STYLE, RADIUS, SPACE } from 'const';
import { useAppTheme, useResponsiveLayout } from 'hooks';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, DataTable, Surface, Text, TouchableRipple } from 'react-native-paper';
import { getObj } from 'utils';

type PrevDepth = [never, 0, 1, 2, 3];

// Depth-limited so circular DTOs (category <-> product) do not recurse forever
export type DeepKeys<T, Depth extends number = 3> = [Depth] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T & (string | number)]-?: `${K}` | `${K}.${DeepKeys<T[K], PrevDepth[Depth]>}`;
      }[keyof T & (string | number)]
    : never;

export type TableColumnConfig<T> = {
  title: string;
  field: DeepKeys<T>;
  flex?: number;
  render?: (value: string | number | boolean | Date) => ReactNode | string;
};

type Props<T> = {
  columnConfigs: TableColumnConfig<T>[];
  dataList: T[];
  isLoading?: boolean;
  onClickRow?: (data: T) => void;
};

const AppTable = <T extends object>({ columnConfigs, dataList = [], isLoading, onClickRow = () => {} }: Props<T>) => {
  const TableHeader = DataTable.Header;
  const TableTitle = DataTable.Title;
  const TableRow = DataTable.Row;
  const TableCell = DataTable.Cell;
  const { colors } = useAppTheme();
  const { isPhone } = useResponsiveLayout();

  const renderCellValue = (data: T, colCfg: TableColumnConfig<T>): ReactNode => {
    const value = getObj(data, colCfg.field);

    return colCfg.render?.(value) || value;
  };

  // phone: one card per row, each column as a label / value line
  const renderRowCard = (colCfgs: TableColumnConfig<T>[], data: T) => (
    <Surface key={JSON.stringify(data)} elevation={1} style={styles.card}>
      <TouchableRipple onPress={() => onClickRow(data)} style={styles.cardRipple}>
        <View style={styles.cardContent}>
          {colCfgs.map(colCfg => {
            const cellValue = renderCellValue(data, colCfg);

            return (
              <View key={colCfg.title} style={styles.cardLine}>
                <Text variant="labelMedium" style={{ color: colors.onSurfaceVariant }}>
                  {colCfg.title}
                </Text>
                <View style={styles.cardValue}>
                  {typeof cellValue === 'object' ? cellValue : <Text variant="bodyMedium">{cellValue}</Text>}
                </View>
              </View>
            );
          })}
        </View>
      </TouchableRipple>
    </Surface>
  );

  const renderTableHeaders = (colCfg: TableColumnConfig<T>[]) => {
    return colCfg.map(item => (
      <TableTitle
        key={item.title}
        style={[styles.tableTitle, { flex: item.flex }]}
        textStyle={{ color: colors.onSurfaceVariant }}
      >
        {item.title}
      </TableTitle>
    ));
  };

  const renderSingleTableCell = (data: T, colCfg: TableColumnConfig<T>): ReactNode => {
    return (
      <TableCell key={colCfg.title} style={[styles.tableCell, { flex: colCfg.flex }]}>
        {renderCellValue(data, colCfg)}
      </TableCell>
    );
  };

  const renderTableRow = (colCfgs: TableColumnConfig<T>[], data: T) => {
    return (
      <TableRow key={JSON.stringify(data)} onPress={() => onClickRow(data)} style={styles.tableRow}>
        {colCfgs.map(tcc => renderSingleTableCell(data, tcc))}
      </TableRow>
    );
  };

  if (isPhone) {
    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.cardList}>
        {isLoading && <ActivityIndicator animating />}

        {dataList?.map(d => renderRowCard(columnConfigs, d))}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.tableContainer}>
      <DataTable style={[styles.table, { backgroundColor: colors.elevation.level1 }]}>
        <TableHeader>{renderTableHeaders(columnConfigs)}</TableHeader>

        {isLoading && <ActivityIndicator animating />}

        {dataList?.map(d => renderTableRow(columnConfigs, d))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    ...BASE_STYLE.SCROLL_VIEW_DEFAULT,
  },

  tableContainer: {
    padding: SPACE.md,
  },

  table: {
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },

  tableRow: {
    minHeight: 52,
  },

  tableCell: {
    paddingHorizontal: SPACE.xs,
  },

  tableTitle: {
    paddingHorizontal: SPACE.xs,
  },

  cardList: {
    padding: SPACE.md,
    gap: SPACE.xs,
  },

  card: {
    borderRadius: RADIUS.md,
  },

  cardRipple: {
    borderRadius: RADIUS.md,
  },

  cardContent: {
    padding: SPACE.md,
    gap: SPACE.xs,
  },

  cardLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACE.sm,
    minHeight: 32,
  },

  cardValue: {
    flexShrink: 1,
    alignItems: 'flex-end',
  },
});

export default AppTable;
