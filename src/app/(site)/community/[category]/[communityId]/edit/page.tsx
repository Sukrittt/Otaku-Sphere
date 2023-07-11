interface CommunityEditPageProps {
  params: {
    communityId: string;
    category: string;
  };
}

const CommunityEditPage = ({ params }: CommunityEditPageProps) => {
  const { communityId, category } = params;

  return (
    <div>
      Edit page for community - {communityId} with category - {category}
    </div>
  );
};

export default CommunityEditPage;
