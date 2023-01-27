import { MoviePickRepo } from "./MoviePickRepo";

export class LocalStorageMoviePickRepo implements MoviePickRepo {
  async getByFirstLetter(firstLetter: string): Promise<string | null> {
    return localStorage.getItem(firstLetter.toUpperCase()) ?? null;
  }

  async getAll(): Promise<string[]> {
    const all: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        all.push(localStorage.getItem(key) as string);
      }
    }
    return all;
  }

  async put(title: string): Promise<void> {
    const firstLetter = title[0].toUpperCase();
    if (title) {
      localStorage.setItem(firstLetter, title);
    }
  }

  async remove(title: string): Promise<void> {
    const firstLetter = title[0].toUpperCase();
    if (title) {
      localStorage.removeItem(firstLetter);
    }
  }
}
