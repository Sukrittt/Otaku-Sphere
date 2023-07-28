import { Icons } from "@/components/Icons";
import { SidebarNavType } from "@/types/item-type";

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

export const pollSidebarNavItems: SidebarNavType[] = [
  {
    id: 1,
    label: "Polls",
    Icon: Icons.activity,
    href: "/poll",
  },
  {
    id: 2,
    label: "Results",
    Icon: Icons.info,
    href: "/poll/results",
  },
];

export const dialogue = [
  {
    id: 1,
    message:
      "I Don’t Want To Conquer Anything. I Just Think The Guy With The Most Freedom In The Entire Ocean Is The Pirate King.",
    character: "Monkey D. Luffy",
  },
  {
    id: 2,
    message:
      "If You Hurt Somebody… Or If Somebody Hurts You, The Blood That Flows Is Still Red.",
    character: "Monkey D. Luffy",
  },
  {
    id: 3,
    message:
      "The world isn’t perfect. But it’s there for us, doing the best it can… that’s what makes it so damn beautiful.",
    character: "Roy Mustang",
  },
  {
    id: 4,
    message:
      "To know sorrow is not terrifying. What is terrifying is to know you can’t go back to happiness you could have.",
    character: "Matsumoto Rangiku",
  },
  {
    id: 5,
    message:
      "Those who stand at the top determine what’s wrong and what’s right! This very place is neutral ground! Justice will prevail, you say? But, of course, it will! Whoever wins this war becomes justice!",
    character: "Don Quixote Doflamingo",
  },
  {
    id: 6,
    message:
      "Whatever you lose, you’ll find it again. But what you throw away you’ll never get back.",
    character: "Kenshin Himura",
  },
  {
    id: 7,
    message:
      "I am the hope of the universe. I am the answer to all living things that cry out for peace. I am protector of the innocent. I am the light in the darkness. I am truth. Ally to good! Nightmare to you!",
    character: "Son Goku",
  },
  {
    id: 8,
    message:
      "People, who can’t throw something important away, can never hope to change anything.",
    character: "Armin Arlert",
  },
  {
    id: 9,
    message: "If you don’t take risks, you can’t create a future!",
    character: "Monkey D. Luffy",
  },
  {
    id: 10,
    message:
      "The future belongs to those who believe in the beauty of their dreams.",
    character: "Shoyo Hinata",
  },
  {
    id: 11,
    message: "A dropout will beat a genius through hard work.",
    character: "Rock Lee",
  },
  {
    id: 12,
    message: "How can you keep moving forward if you keep regretting the past?",
    character: "Edward Elric",
  },
  {
    id: 13,
    message:
      "You focus on the trivial and lose sight of what is most important; change is impossible in this fog of ignorance.",
    character: "Itachi Uchiha",
  },
  {
    id: 14,
    message:
      "Sometimes, we have to look beyond what we want and do what’s best.",
    character: "Piccolo",
  },
  {
    id: 15,
    message: "Revenge is just the path you take to escape your suffering.",
    character: "Ichigo Kurosaki",
  },
  {
    id: 16,
    message: "The world is cruel but also very beautiful.",
    character: "Mikasa Ackerman",
  },
  {
    id: 17,
    message: "Because people don’t have wings, we look for ways to fly.",
    character: "Coach Ukai",
  },
  {
    id: 18,
    message: "Push through the pain; giving up hurts more.",
    character: "Vegeta",
  },
  {
    id: 19,
    message:
      "No matter how hard or impossible it is, never lose sight of your goal.",
    character: "Monkey D. Luffy",
  },
  {
    id: 20,
    message:
      "People’s lives don’t end when they die, it ends when they lose faith.",
    character: "Itachi Uchiha",
  },
  {
    id: 21,
    message: "If you don’t like your destiny, don’t accept it.",
    character: "Naruto Uzumaki",
  },
  {
    id: 22,
    message:
      "There’s no shame in falling down! True shame is to not stand up again!",
    character: "Shintaro Midorima",
  },
  {
    id: 23,
    message:
      "If you wanna make people dream, you’ve gotta start by believing in that dream yourself!",
    character: "Seiya Kanie",
  },
  {
    id: 24,
    message: "If you can’t do something, then don’t. Focus on what you can.",
    character: "Shiroe",
  },
  {
    id: 25,
    message: "Being weak is nothing to be ashamed of… Staying weak is !!",
    character: "Fuegoleon Vermillion",
  },
  {
    id: 26,
    message: "Reject common sense to make the impossible possible.",
    character: "Simon",
  },
  {
    id: 27,
    message:
      "A person grows up when he’s able to overcome hardships. Protection is important, but there are some things that a person must learn on his own.",
    character: "Jiraiya",
  },
  {
    id: 28,
    message:
      "Hard work is worthless for those that don’t believe in themselves.",
    character: "Naruto Uzumaki",
  },
  {
    id: 29,
    message:
      "It’s not always possible to do what we want to do, but it’s important to believe in something before you actually do it.",
    character: "Might Guy",
  },
  {
    id: 30,
    message:
      "Everyone Has Things They Can Do And Cannot Do. I'll Do What You Can't Do, And You Do What I Can't Do.",
    character: "Vinsmoke Sanji",
  },
  {
    id: 31,
    message: "Scars On The Back Are A Swordsman's Shame.",
    character: "Roronoa Zoro",
  },
  {
    id: 32,
    message:
      "There Comes A Time When A Man Must Stand And Fight. And That Is When His Friends' Dreams Are Being Laughed At!",
    character: "God Usopp",
  },
  {
    id: 33,
    message: "People’s Dreams... Have No Ends.",
    character: "Marshall D. Teach",
  },
  {
    id: 34,
    message:
      "When You Aim High, You Sometimes Come Across Fights Not Worth Fighting.",
    character: "Marshall D. Teach",
  },
  {
    id: 35,
    message:
      "Inherited Will, The Destiny Of Age, The Dreams Of Its People. As Long As People Continue To Pursue The Meaning Of Freedom, These Things Will Never Cease!",
    character: "Gol D. Roger",
  },
];
