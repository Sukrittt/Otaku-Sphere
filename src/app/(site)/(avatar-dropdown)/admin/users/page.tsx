import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";

const UsersPage = () => {
  return (
    <Shell layout="dashboard">
      <Header
        title="Users"
        description="Details of the users on the site."
        size="sm"
      />
      {/* <UserDataTable columns={adminColumns} data={structuredRankingData} /> */}
    </Shell>
  );
};

export default UsersPage;
