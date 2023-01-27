import { MoviePickRepo } from "./MoviePickRepo";

export class EmptyMovieTitleError extends Error {
  constructor() {
    super("The movie title cannot be empty");
  }
}

export class MoviePickAlreadyExistError extends Error {
  constructor(firstLetter: string) {
    super(`A movie has already been picked for the letter ${firstLetter}`);
  }
}

export class MoviePicker {
  private repo: MoviePickRepo;

  constructor(repo: MoviePickRepo) {
    this.repo = repo;
  }

  async pick(title: string) {
    if (!title) {
      throw new EmptyMovieTitleError();
    }
    const firstLetter = title[0].toUpperCase();
    const existingPick = await this.repo.getByFirstLetter(firstLetter);
    if (existingPick) {
      throw new MoviePickAlreadyExistError(firstLetter);
    }
    await this.repo.put(title);
  }

  async remove(title: string) {
    if (!title) {
      throw new EmptyMovieTitleError();
    }
    await this.repo.remove(title);
  }
}
