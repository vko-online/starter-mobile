

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllCategories
// ====================================================

export interface GetAllCategories_categories_edges_node {
  id: string;
  name: string;
  image: string | null;
}

export interface GetAllCategories_categories_edges {
  cursor: string;
  node: GetAllCategories_categories_edges_node;
}

export interface GetAllCategories_categories_pageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetAllCategories_categories {
  edges: GetAllCategories_categories_edges[];
  pageInfo: GetAllCategories_categories_pageInfo;
  total: number;
}

export interface GetAllCategories {
  categories: GetAllCategories_categories;
}

export interface GetAllCategoriesVariables {
  text?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: currentUser
// ====================================================

export interface currentUser_currentUser {
  id: string;
  avatar_url: string | null;
  email: string;
  fullName: string | null;
}

export interface currentUser {
  currentUser: currentUser_currentUser | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login {
  id: string;
  jwt: string | null;
  email: string;
  avatar_url: string | null;
  fullName: string | null;
}

export interface login {
  login: login_login | null;
}

export interface loginVariables {
  user: SigninUserInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup {
  id: string;
  jwt: string | null;
  email: string;
}

export interface signup {
  signup: signup_signup | null;
}

export interface signupVariables {
  user: SignupUserInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_users {
  id: string;
  fullName: string | null;
  email: string;
  avatar_url: string | null;
}

export interface users {
  users: (users_users | null)[] | null;
}

export interface usersVariables {
  text?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// 
export interface SigninUserInput {
  email: string;
  password: string;
}

// 
export interface SignupUserInput {
  email: string;
  password: string;
  fullName: string;
  registrationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================