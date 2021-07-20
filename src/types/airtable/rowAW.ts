// Adam Walsh data row
export type DataAW = {
  awData: RowAW;
};

export type RowAW = {
  state: string;
  fee: string;
  notary: string;
  witness: string;
  contact_type: string;
  mail: string;
  original_copy: boolean | null;
  ink: string;
  typed_or_printed: string;
  fax: string;
  email: string;
  electronic_form: string;
  response: string;
  response_time: string;
  notes: string;
};
