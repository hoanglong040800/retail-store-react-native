import { BASE_STYLE } from 'const';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { getObj } from 'utils';

export type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string | number ? K | `${K}.${DeepKeys<T[K]>}` : never; // Exclude symbol keys
    }[keyof T] extends infer D
    ? D extends string
      ? D
      : never
    : never
  : '';

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

  const renderTableHeaders = (colCfg: TableColumnConfig<T>[]) => {
    return colCfg.map(item => (
      <TableTitle key={item.title} style={[styles.tableTitle, { flex: item.flex }]}>
        {item.title}
      </TableTitle>
    ));
  };

  const renderSingleTableCell = (data: T, colCfg: TableColumnConfig<T>): ReactNode => {
    const value = getObj(data, colCfg.field);

    return (
      <TableCell key={colCfg.title} style={[styles.tableCell, { flex: colCfg.flex }]}>
        {colCfg.render?.(value) || value}
      </TableCell>
    );
  };

  const renderTableRow = (colCfgs: TableColumnConfig<T>[], data: T) => {
    return (
      <TableRow key={JSON.stringify(data)} onPress={() => onClickRow(data)}>
        {colCfgs.map(tcc => renderSingleTableCell(data, tcc))}
      </TableRow>
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <DataTable>
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
    paddingVertical: 16,
  },

  tableCell: {
    paddingHorizontal: 8,
  },

  tableTitle: {
    paddingHorizontal: 8,
  },
});

export default AppTable;
