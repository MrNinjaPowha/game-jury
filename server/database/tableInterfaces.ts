type PrimaryKey = number;
type ForeignKey = number;

interface TableUser {
  id: PrimaryKey;
  username: string;
  password: string;
  birthdate: string;
  profileImage: string;
  favoriteGameId: ForeignKey | null;
  createdAt: string;
}

interface TableGame {
  id: PrimaryKey;
  title: string;
  titleSlug: string;
  releaseDate: string;
  ageRatingId: ForeignKey;
  boxArtImage: string;
  bannerImage: string;
  summary: string;
  createdAt: string;
  editedAt: string;
}

interface TableReview {
  id: PrimaryKey;
  gameId: ForeignKey;
  userId: ForeignKey | null;
  rating: number;
  message: string | null;
  postedAt: string;
  editedAt: string;
}

interface TableComment {
  id: PrimaryKey;
  gameId: ForeignKey;
  userId: ForeignKey;
  message: string;
  postedAt: string;
  editedAt: string;
}

interface TableAgeRating {
  id: number;
  name: string;
  image: string;
}

interface TableCompany {
  id: number;
  name: string;
}

interface TableDeveloper {
  gameId: number;
  companyId: number;
}

interface TablePublisher {
  gameId: number;
  companyId: number;
}

interface TableGenre {
  id: number;
  name: string;
}

interface TableInGenre {
  gameId: number;
  genreId: number;
}

interface TablePlatform {
  id: number;
  name: string;
}

interface TableOnPlatform {
  gameId: number;
  platformId: number;
}

export type {
  TableUser,
  TableGame,
  TableReview,
  TableComment,
  TableAgeRating,
  TableCompany,
  TableDeveloper,
  TablePublisher,
  TableGenre,
  TableInGenre,
  TablePlatform,
  TableOnPlatform,
};
