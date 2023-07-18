import CreateCommunityForm from "@/components/Forms/CreateCommunityForm";
import { Shell } from "@/components/Shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/Card";

const page = () => {
  return (
    <Shell layout="dashboard">
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <CardTitle>Create a community</CardTitle>
          <CardDescription className="line-clamp-2">
            Create a community for your interests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateCommunityForm />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default page;
