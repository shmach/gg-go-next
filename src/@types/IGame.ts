export interface IGame {
  id: number;
  name: string;
  cover?: { id: number; url: string };
  first_release_date: number;
  release_dates: {
    id: number;
    human: string;
  }[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  platforms: Record<string, any>;
  summary?: string;
  url?: string;
}
