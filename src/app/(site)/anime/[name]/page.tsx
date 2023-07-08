import { formatUrl } from "@/lib/utils";

interface AnimePageProps {
  params: {
    name: string;
  };
}

const AnimePage = ({ params }: AnimePageProps) => {
  const { name: rawName } = params;
  const name = formatUrl(rawName, true);

  return <div>{name}</div>;
};

export default AnimePage;
