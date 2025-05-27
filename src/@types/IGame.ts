export interface IGame {
  name: string;
  cover?: { id: number; url: string };
  first_release_date: number;
  release_dates: {
    id: number;
    human: string;
  }[];
  id: number;
}
