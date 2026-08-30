export type User = {
  id: string;
  name: string;
};

export type UsersQueryResponse = {
  users: User[];
};

export type UsersQueryVariables = {
  ids: string[];
};
