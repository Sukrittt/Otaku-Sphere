import { ErrorCard } from "@/ui/ErrorCard";
import { Shell } from "@/components/Shell";

export default function PageNotFound() {
  return (
    <Shell layout="centered" className="mt-0 h-screen">
      <ErrorCard
        title="Page not found"
        description="The page you are looking for does not exist"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </Shell>
  );
}
