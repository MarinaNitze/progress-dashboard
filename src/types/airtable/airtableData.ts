export type AirTableNames = 'awData' | 'statesData';

export type AirtableData<T = unknown> = {
  [key in AirTableNames]?: AirtableNode<T>;
};

export type AirtableNode<T> = {
  nodes: AirtableNodeData<T>;
};

export type AirtableNodeData<T> = {
  data: T;
}[];
