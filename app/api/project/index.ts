import { IListResponse, IRes } from "@/app/interface";
import { http } from "../axiosClient";
import { ENDPOINT } from "../endpoint";

class Project {
  list = async (): Promise<IRes<IListResponse>> => {
    const res: IRes<IListResponse> = await http.get(ENDPOINT.PROJECT.LIST);
    return res;
  };
}

export const ProjectService = new Project();
