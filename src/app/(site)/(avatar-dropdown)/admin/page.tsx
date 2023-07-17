import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { UserDataTable } from "@/components/User/UserDataTable";
import { adminColumns } from "@/components/Rankings/TableColumn";
import { AdminDisplay } from "@/types/item-type";
import { format } from "date-fns";
import { Header } from "@/components/Header";

const AdminPage = async () => {
  const adminUsers = await db.user.findMany({
    where: {
      role: "ADMIN",
    },
    include: {
      anime: true,
    },
  });

  const structuredRankingData: AdminDisplay[] = adminUsers.flatMap((user) => ({
    name: user.name,
    email: user.email,
    createdAt: format(user.createdAt, "do MMMM',' yyyy"),
    animeAdded: user.anime.length,
  }));

  return (
    <Shell layout="dashboard">
      <Header
        title="Admins"
        description="Details of all the admins on the site."
        size="sm"
      />
      <UserDataTable columns={adminColumns} data={structuredRankingData} />
    </Shell>
  );
};

export default AdminPage;
