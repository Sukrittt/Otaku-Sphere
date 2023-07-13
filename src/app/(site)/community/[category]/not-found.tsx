import { ErrorCard } from "@/ui/ErrorCard";
import { Shell } from "@/components/Shell";

export default function PageNotFound() {
  return (
    <Shell layout="centered">
      <ErrorCard
        title="Page not found"
        description="The page you are looking for does not exist"
        retryLink="/community"
        retryLinkText="Go to Community"
      />
    </Shell>
  );
}
