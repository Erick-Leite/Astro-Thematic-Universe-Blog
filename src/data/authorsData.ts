import { authorsAvatar } from "./authorsAvatar";

export interface AuthorData {
  slug: string;
  name: string;
  avatar: ImageMetadata;
  bio: string;
}

// O autor padrão é o primeiro da lista
export const authorsData: AuthorData[] = [
  {
    slug: "pedro-erick",
    name: "Pedro Erick",
    avatar: authorsAvatar.pedro_erick,
    bio: "Olá!, me chamo Pedro Erick, sou desenvolvido front-end e o dono deste blog",
  },
];
