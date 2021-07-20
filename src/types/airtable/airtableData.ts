export type AirTableNames = 'awData';

export type AirtableData<T> = {
  [key in AirTableNames]: AirtableNode<T>;
};

export type AirtableNode<T> = {
  nodes: {
    data: T;
  }[];
};
