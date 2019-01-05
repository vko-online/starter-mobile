/** pagination */
export interface ConnectionInput {
  first?: number | null;

  after?: string | null;

  last?: number | null;

  before?: string | null;
}

export interface SigninUserInput {
  email: string;

  password: string;
}

export interface SignupUserInput {
  email: string;

  password: string;

  fullName: string;

  registrationId?: string | null;
}

export interface UpdateUserInput {
  avatarFile?: File | null;

  avatar?: ImageInput | null;

  fullName?: string | null;

  email?: string | null;

  registrationId?: string | null;
}

export interface File {
  name: string;

  type: string;

  size: number;

  path: string;
}

export interface ImageInput {
  filename?: string | null;

  width?: number | null;

  height?: number | null;
}

export interface CreateUserInput {
  avatarFile?: File | null;

  avatar?: ImageInput | null;

  avatarId?: string | null;

  fullName: string;

  email?: string | null;

  password?: string | null;
}

/** A date string, such as 2007-12-03, compliant with the `full-date` formatoutlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard forrepresentation of dates and times using the Gregorian calendar. */
export type Date = any;

/** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the`date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO8601 standard for representation of dates and times using the Gregorian calendar. */
export type DateTime = any;

/** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` formatoutlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard forrepresentation of dates and times using the Gregorian calendar. */
export type Time = any;

/** The `Upload` scalar type represents a file upload. */
export type Upload = any;

// ====================================================
// Documents
// ====================================================

export namespace GetAllCategories {
  export type Variables = {
    text?: string | null;
  };

  export type Query = {
    __typename?: "Query";

    categories: Categories;
  };

  export type Categories = {
    __typename?: "CategoryConnection";

    edges: Edges[];

    pageInfo: PageInfo;

    total: number;
  };

  export type Edges = {
    __typename?: "CategoryEdge";

    cursor: string;

    node: Node;
  };

  export type Node = {
    __typename?: "Category";

    id: string;

    name: string;

    image: string | null;
  };

  export type PageInfo = {
    __typename?: "PageInfo";

    hasNextPage: boolean;

    hasPreviousPage: boolean;
  };
}

export namespace CurrentUser {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    currentUser: CurrentUser | null;
  };

  export type CurrentUser = {
    __typename?: "User";

    id: string;

    avatar_url: string | null;

    email: string;

    fullName: string | null;
  };
}

export namespace Login {
  export type Variables = {
    user: SigninUserInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    login: Login | null;
  };

  export type Login = {
    __typename?: "User";

    id: string;

    jwt: string | null;

    email: string;

    avatar_url: string | null;

    fullName: string | null;
  };
}

export namespace Signup {
  export type Variables = {
    user: SignupUserInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    signup: Signup | null;
  };

  export type Signup = {
    __typename?: "User";

    id: string;

    jwt: string | null;

    email: string;
  };
}

export namespace FindAllUsers {
  export type Variables = {
    text?: string | null;
  };

  export type Query = {
    __typename?: "Query";

    users: (Users | null)[] | null;
  };

  export type Users = {
    __typename?: "User";

    id: string;

    fullName: string | null;

    email: string;

    avatar_url: string | null;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace GetAllCategories {
  export const Document = gql`
    query GetAllCategories($text: String) {
      categories(text: $text) {
        edges {
          cursor
          node {
            id
            name
            image
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        total
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace CurrentUser {
  export const Document = gql`
    query currentUser {
      currentUser {
        id
        avatar_url
        email
        fullName
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace Login {
  export const Document = gql`
    mutation login($user: SigninUserInput!) {
      login(user: $user) {
        id
        jwt
        email
        avatar_url
        fullName
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace Signup {
  export const Document = gql`
    mutation signup($user: SignupUserInput!) {
      signup(user: $user) {
        id
        jwt
        email
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace FindAllUsers {
  export const Document = gql`
    query findAllUsers($text: String) {
      users(text: $text) {
        id
        fullName
        email
        avatar_url
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
