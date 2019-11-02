export interface IListQuery {
  skip: number;
  limit: number;
  userid?: string;
  taskid?: string;
  type?: string;
}

export interface IlistFilter {
  userid?: string;
  taskid?: string;
  type?: string;
}
