export interface IDataPageErrors {
  hasErrors: boolean;
  message?: string;
}

export interface IData {
  hasData: boolean;
  rows: any[];
  columns: any[];
}

export interface IDataPageShellProps {
  entityName: string;
  data: IData;
  errors: Partial<IDataPageErrors>;
}
