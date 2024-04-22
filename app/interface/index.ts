export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRes<T> {
  data: T;
  status: boolean;
}

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface License {
  license_type: string;
  libraries: string[];
}

export interface IProjectResponse {
  id: number;
  project_name: string;
  project_domain: string;
  last_accessed: string;
  license_use: License[];
}

export interface IListResponse {
  results: IProjectResponse[];
}
