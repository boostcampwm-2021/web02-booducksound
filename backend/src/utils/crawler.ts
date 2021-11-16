import { searchVideo } from "./search";

export const Name = (name: string) => `Hello ${name}`;

export function search(searchQuery: string) {
  return searchVideo(searchQuery);
}
