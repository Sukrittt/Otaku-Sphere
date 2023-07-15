import { Icons } from "@/components/Icons";
import { DummyType, SidebarNavType } from "@/types/item-type";

export const adminSidebarNavItems: SidebarNavType[] = [
  {
    id: 1,
    label: "Users",
    Icon: Icons.user,
    href: "/admin/users",
  },
  {
    id: 2,
    label: "Anime",
    Icon: Icons.anime,
    href: "/admin/anime",
  },
  {
    id: 3,
    label: "Admins",
    Icon: Icons.crown,
    href: "/admin",
  },
];

export const communitySidebarNavItems: SidebarNavType[] = [
  {
    id: 1,
    label: "#all",
    Icon: Icons.boxes,
    href: "/community",
  },
  {
    id: 2,
    label: "#general",
    Icon: Icons.info,
    href: "/community/general",
  },
  {
    id: 3,
    label: "#anime",
    Icon: Icons.anime,
    href: "/community/anime",
  },
  {
    id: 4,
    label: "#manga",
    Icon: Icons.book,
    href: "/community/manga",
  },
  {
    id: 5,
    label: "#question",
    Icon: Icons.question,
    href: "/community/question",
  },
  {
    id: 6,
    label: "#feedback",
    Icon: Icons.feedback,
    href: "/community/feedback",
  },
];

// REMOVE THIS!!!

export const dummyData: DummyType[] = [
  {
    id: 1,
    name: "Item 1",
    category: "notStarted",
  },
  {
    id: 2,
    name: "Item 2",
    category: "notStarted",
  },
  {
    id: 3,
    name: "Item 3",
    category: "notStarted",
  },
];
