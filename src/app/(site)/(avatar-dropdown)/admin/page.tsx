import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { UserDataTable } from "@/components/User/UserDataTable";
import { adminColumns } from "@/components/Rankings/TableColumn";
import { AdminDisplay } from "@/types/item-type";
import { format } from "date-fns";
import { Header } from "@/components/Header";
import CustomAdminSheet from "@/components/Custom-UI/CustomAdminSheet";
import { ScrollArea } from "@/ui/ScrollArea";

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
      <div className="space-y-4 overflow-y-scroll">
        <CustomAdminSheet>Manage admin</CustomAdminSheet>
        <ScrollArea className="w-full" orientation="horizontal">
          <UserDataTable columns={adminColumns} data={structuredRankingData} />
        </ScrollArea>
      </div>
    </Shell>
  );
};

export default AdminPage;
