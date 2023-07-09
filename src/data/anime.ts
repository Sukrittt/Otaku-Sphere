import { ComboBoxItemType } from "@/types/item-type";

export const animeData = [
  {
    id: 1,
    title: "Attack on Titan",
    genre: ["Action", "Fantasy", "Drama"],
    releaseYear: 2013,
    director: "Tetsurō Araki",
    description:
      "In a world where humanity is on the brink of extinction due to giant humanoid creatures called Titans, a young boy named Eren Yeager joins the fight to reclaim their land and uncover the truth behind the Titans.",
  },
  {
    id: 2,
    title: "My Hero Academia",
    genre: ["Action", "Superhero", "Comedy"],
    releaseYear: 2016,
    director: "Kenji Nagasaki",
    description:
      "In a world where people with superpowers known as 'Quirks' are the norm, Izuku Midoriya dreams of becoming a hero despite being born without a Quirk.",
  },
  {
    id: 3,
    title: "One Piece",
    genre: ["Adventure", "Action", "Comedy"],
    releaseYear: 1999,
    director: "Kōnosuke Uda",
    description:
      "Monkey D. Luffy and his crew of Straw Hat Pirates set sail on a grand adventure to find the ultimate treasure known as 'One Piece' and become the Pirate King.",
  },
  {
    id: 4,
    title: "Naruto",
    genre: ["Action", "Adventure", "Fantasy"],
    releaseYear: 2002,
    director: "Hayato Date",
    description:
      "Naruto Uzumaki, a young ninja with a sealed demonic power, embarks on a journey to become the strongest ninja and protect his village from various threats.",
  },
  {
    id: 5,
    title: "Death Note",
    genre: ["Mystery", "Psychological", "Thriller"],
    releaseYear: 2006,
    director: "Tetsurō Araki",
    description:
      "Light Yagami, a high school student, discovers a mysterious notebook that grants him the power to kill anyone by writing their name in it, leading to a battle of wits with the enigmatic detective known as L.",
  },
  {
    id: 6,
    title: "Fullmetal Alchemist: Brotherhood",
    genre: ["Action", "Adventure", "Fantasy"],
    releaseYear: 2009,
    director: "Yasuhiro Irie",
    description:
      "In a world where alchemy is a widespread scientific technique, two brothers, Edward and Alphonse Elric, seek the Philosopher's Stone to restore their bodies after a failed alchemical experiment.",
  },
  {
    id: 7,
    title: "Demon Slayer",
    genre: ["Action", "Supernatural", "Historical"],
    releaseYear: 2019,
    director: "Haruo Sotozaki",
    description:
      "Tanjiro Kamado becomes a demon slayer to seek revenge against the demons that slaughtered his family and turned his sister, Nezuko, into a demon.",
  },
  {
    id: 8,
    title: "Hunter x Hunter",
    genre: ["Action", "Adventure", "Fantasy"],
    releaseYear: 2011,
    director: "Hiroshi Koujina",
    description:
      "Gon Freecss embarks on a journey to become a Hunter, a licensed professional who hunts down secret treasures, rare beasts, and even other individuals.",
  },
  {
    id: 9,
    title: "Sword Art Online",
    genre: ["Action", "Adventure", "Fantasy"],
    releaseYear: 2012,
    director: "Tomohiko Itō",
    description:
      "In the near future, players immerse themselves in a virtual reality MMORPG called Sword Art Online, only to discover that they are trapped inside the game and must clear all 100 floors to escape.",
  },
  {
    id: 10,
    title: "Cowboy Bebop",
    genre: ["Action", "Sci-Fi", "Drama"],
    releaseYear: 1998,
    director: "Shinichirō Watanabe",
    description:
      "Spike Spiegel and his crew of bounty hunters roam the solar system in their spaceship, the Bebop, as they pursue dangerous criminals and confront their troubled pasts.",
  },
  {
    id: 11,
    title: "Dragon Ball Z",
    genre: ["Action", "Adventure", "Fantasy"],
    releaseYear: 1989,
    director: "Daisuke Nishio",
    description:
      "Goku, a Saiyan warrior, defends the Earth against various villains and seeks to become stronger by training and participating in epic battles.",
  },
  {
    id: 12,
    title: "Haikyu!!",
    genre: ["Sports", "Comedy", "Drama"],
    releaseYear: 2014,
    director: "Susumu Mitsunaka",
    description:
      "Shoyo Hinata, inspired by a small-statured volleyball player, joins the Karasuno High School volleyball team and aims to compete in national tournaments.",
  },
  {
    id: 13,
    title: "Fairy Tail",
    genre: ["Action", "Adventure", "Fantasy"],
    releaseYear: 2009,
    director: "Shinji Ishihira",
    description:
      "Lucy Heartfilia, a celestial wizard, joins the Fairy Tail Guild and embarks on magical adventures with her teammates as they strive to protect their world from evil forces.",
  },
  {
    id: 14,
    title: "Your Lie in April",
    genre: ["Romance", "Music", "Drama"],
    releaseYear: 2014,
    director: "Kyōhei Ishiguro",
    description:
      "Kosei Arima, a former piano prodigy who lost his ability to play, finds inspiration and love when he meets Kaori Miyazono, a free-spirited violinist.",
  },
  {
    id: 15,
    title: "Attack on Titan: The Final Season",
    genre: ["Action", "Fantasy", "Drama"],
    releaseYear: 2020,
    director: "Yuichiro Hayashi",
    description:
      "The battle between humanity and the Titans reaches its climax as Eren Yeager and his friends face their greatest challenges and uncover the secrets of the Titans' origin.",
  },
  {
    id: 16,
    title: "One Punch Man",
    genre: ["Action", "Comedy", "Superhero"],
    releaseYear: 2015,
    director: "Shingo Natsume",
    description:
      "Saitama, a superhero who can defeat any opponent with a single punch, seeks a worthy opponent to challenge his overwhelming power.",
  },
  {
    id: 17,
    title: "Kimetsu no Yaiba Movie: Mugen Train",
    genre: ["Action", "Supernatural", "Drama"],
    releaseYear: 2020,
    director: "Haruo Sotozaki",
    description:
      "Tanjiro Kamado and his friends embark on a dangerous mission aboard the mysterious Mugen Train to investigate a series of disappearances and confront a powerful demon.",
  },
  {
    id: 18,
    title: "Steins;Gate",
    genre: ["Thriller", "Sci-Fi", "Drama"],
    releaseYear: 2011,
    director: "Hiroshi Hamasaki",
    description:
      "Rintarou Okabe, a self-proclaimed mad scientist, accidentally invents a time machine and becomes entangled in a conspiracy that could alter the course of history.",
  },
  {
    id: 19,
    title: "Tokyo Ghoul",
    genre: ["Action", "Horror", "Supernatural"],
    releaseYear: 2014,
    director: "Shuhei Morita",
    description:
      "Ken Kaneki, a college student turned half-ghoul, must navigate the dark and dangerous world of flesh-eating creatures while struggling with his own identity.",
  },
  {
    id: 20,
    title: "Black Clover",
    genre: ["Action", "Magic", "Fantasy"],
    releaseYear: 2017,
    director: "Tatsuya Yoshihara",
    description:
      "Asta, a young boy without magic powers in a world where magic is everything, aims to become the Wizard King and protect the kingdom from evil forces.",
  },
  {
    id: 21,
    title: "Neon Genesis Evangelion",
    genre: ["Action", "Mecha", "Psychological"],
    releaseYear: 1995,
    director: "Hideaki Anno",
    description:
      "Shinji Ikari is recruited to pilot a giant bio-mechanical robot to protect humanity from mysterious beings known as Angels while dealing with the complexities of human emotions and relationships.",
  },
  {
    id: 22,
    title: "Jujutsu Kaisen",
    genre: ["Action", "Supernatural", "Horror"],
    releaseYear: 2020,
    director: "Sunghoo Park",
    description:
      "Yuji Itadori, a high school student, becomes a part of the Jujutsu Sorcerer society to fight curses and protect people from the dangerous world of curses and demons.",
  },
  {
    id: 23,
    title: "Mob Psycho 100",
    genre: ["Action", "Supernatural", "Comedy"],
    releaseYear: 2016,
    director: "Yuzuru Tachikawa",
    description:
      "Shigeo Kageyama, aka Mob, possesses immense psychic powers, but he seeks to live an ordinary life while dealing with the challenges of controlling his emotions.",
  },
  {
    id: 24,
    title: "The Promised Neverland",
    genre: ["Mystery", "Horror", "Psychological"],
    releaseYear: 2019,
    director: "Mamoru Kanbe",
    description:
      "Emma, Norman, and Ray discover the dark secret behind their seemingly idyllic orphanage and plan an escape to save themselves and their fellow children.",
  },
  {
    id: 25,
    title: "My Hero Academia: Heroes Rising",
    genre: ["Action", "Superhero", "Comedy"],
    releaseYear: 2019,
    director: "Kenji Nagasaki",
    description:
      "Class 1-A from U.A. High School faces a powerful villain on a remote island, testing their abilities and determination as aspiring heroes.",
  },
  {
    id: 26,
    title: "Violet Evergarden",
    genre: ["Drama", "Slice of Life", "Romance"],
    releaseYear: 2018,
    director: "Taichi Ishidate",
    description:
      "Violet Evergarden, a former soldier with mechanical arms, starts a new life as an Auto Memory Doll, helping others convey their feelings through letters.",
  },
  {
    id: 27,
    title: "Gurren Lagann",
    genre: ["Action", "Mecha", "Adventure"],
    releaseYear: 2007,
    director: "Hiroyuki Imaishi",
    description:
      "Simon and Kamina venture to the surface from their underground village and pilot a giant robot to fight against the oppressive Spiral King and his forces.",
  },
  {
    id: 28,
    title: "The Rising of the Shield Hero",
    genre: ["Action", "Adventure", "Fantasy"],
    releaseYear: 2019,
    director: "Takao Abo",
    description:
      "Naofumi Iwatani, one of four legendary heroes summoned to another world, becomes the Shield Hero and must face challenges while being distrusted by society.",
  },
  {
    id: 29,
    title: "Code Geass: Lelouch of the Rebellion",
    genre: ["Action", "Mecha", "Drama"],
    releaseYear: 2006,
    director: "Goro Taniguchi",
    description:
      "Lelouch vi Britannia, a exiled prince, gains the power of Geass and leads a rebellion against the oppressive Holy Britannian Empire in a quest for revenge and justice.",
  },
  {
    id: 30,
    title: "One Piece: Stampede",
    genre: ["Action", "Adventure", "Comedy"],
    releaseYear: 2019,
    director: "Takashi Otsuka",
    description:
      "The Straw Hat Pirates join a pirate festival where a legendary treasure is said to be hidden, but they soon find themselves caught in a battle against some of the most notorious pirates in the world.",
  },
];

export const genres: ComboBoxItemType[] = [
  {
    value: "shōnen",
    label: "Shōnen",
  },
  {
    value: "fiction",
    label: "Fiction",
  },
  {
    value: "comedy",
    label: "Comedy",
  },
  {
    value: "isekai",
    label: "Isekai",
  },
  {
    value: "horror",
    label: "Horror",
  },
  {
    value: "mystery",
    label: "Mystery",
  },
  {
    value: "shoujo",
    label: "Shoujo",
  },
  {
    value: "slice-of-life",
    label: "Slice of life",
  },
  {
    value: "romance",
    label: "Romance",
  },
  {
    value: "seinen",
    label: "Seinen",
  },
  {
    value: "mecha",
    label: "Mecha",
  },
  {
    value: "thriller",
    label: "Thriller",
  },
];
