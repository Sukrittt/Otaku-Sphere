import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();

  return <div></div>;
}
