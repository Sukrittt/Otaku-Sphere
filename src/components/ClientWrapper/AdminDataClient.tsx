// "use client";
// import dynamic from "next/dynamic";
// import { ColumnDef } from "@tanstack/react-table";
// import { AdminDisplay } from "@/types/item-type";

// const UserDataTable = dynamic(() => import("@/components/User/UserDataTable"), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// });

// interface UserDataTableProps<TData, TValue> {
//   columns: ColumnDef<AdminDisplay>[];
//   data: TData[];
// }

// export default function UserDataClient<TData, TValue>({
//   columns,
//   data,
// }: UserDataTableProps<TData, TValue>) {
//   return <UserDataTable columns={columns} data={data} />;
// }
