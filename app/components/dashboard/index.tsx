"use client";

import { ProjectService } from "@/app/api/project";
import { IProjectResponse, License } from "@/app/interface";
import { useQuery } from "@tanstack/react-query";
import { Table, TableProps } from "antd";
import moment from "moment";

const columns: TableProps<IProjectResponse>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Project Name",
    dataIndex: "project_name",
    key: "project_name",
  },
  {
    title: "Project Domain",
    dataIndex: "project_domain",
    key: "project_domain",
  },
  {
    title: "Last Accessed",
    dataIndex: "last_accessed",
    key: "last_accessed",
    render: (last_accessed) => {
      return <p>{moment(last_accessed).format("MMMM DD, YYYY")}</p>;
    },
  },
  {
    title: "License Use",
    dataIndex: "license_use",
    key: "license_use",
    render: (licenseUse: License[]) => {
      return (
        <>
          {licenseUse &&
            licenseUse.length > 0 &&
            licenseUse.map((license: License, licenseIndex: number) => (
              <div key={licenseIndex}>
                <p>License: {license.license_type}</p>
                {license.libraries &&
                  license.libraries.map((lib: string, libIndex: number) => (
                    <p key={`${licenseIndex}-${libIndex}`}>Libraries: {lib} </p>
                  ))}
              </div>
            ))}
        </>
      );
    },
  },
];

export const DashboardLayout = () => {
  const { data: listData } = useQuery({
    queryKey: ["list"],
    queryFn: () => ProjectService.list(),
  });

  return <Table columns={columns} dataSource={listData?.data.results} />;
};
