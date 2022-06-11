import wuzzy from "wuzzy";

import { IBook } from "../../types";
interface SimilaritiesObject {
  [key: string]: number;
}

export default class RecommendationService {
  private bookRepository: any;
  private bookMapper: any;

  constructor({
    bookRepository,
    bookMapper,
  }: {
    bookRepository: any;
    bookMapper: any;
  }) {
    this.bookRepository = bookRepository;
    this.bookMapper = bookMapper;
  }

  async get(bookId: string, user: any) {
    const targetBook = await this.bookRepository.getOne(bookId);
    const targetBookTags = await targetBook
      .getTags()
      .then((tags: any) => tags.map((tag: any) => tag.tag_slug));

    const similarityObject = await this.constructSimilarityObject(
      targetBookTags
    );
    let sanitizedObject = this.sanitize(similarityObject);
    // if (user) {
    //   sanitizedObject = await this.filterOutUsedBooks(sanitizedObject, user);
    // }

    let most5books = await this.pickMostFive(sanitizedObject);
    return most5books.map((book: IBook) =>
      this.bookMapper.toEntityAdjustedForSearch(book)
    );
  }

  private async constructSimilarityObject(
    targetTags: string[]
  ): Promise<SimilaritiesObject> {
    let similarityObject: SimilaritiesObject = {};
    const allBooks = await this.bookRepository.getAll();

    const promises = allBooks.map(async (book: any) => {
      let tags = await book
        .getTags()
        .then((tags: any) => tags.map((tag: any) => tag.tag_slug));

      similarityObject[book.id] = wuzzy.jaccard(targetTags, tags);
    });
    await Promise.all(promises);

    return similarityObject;
  }

  private sanitize(object: SimilaritiesObject): SimilaritiesObject {
    return Object.keys(object)
      .filter(function (key) {
        return object[key] !== 0 && object[key] !== 1;
      })
      .reduce(function (out: SimilaritiesObject, key) {
        // recreate object using filtered keys
        out[key] = object[key];
        return out;
      }, {});
  }

  private filterOutUsedBooks(
    object: SimilaritiesObject,
    user: any
  ): SimilaritiesObject {
    return {};
  }

  private async pickMostFive(
    object: SimilaritiesObject,
    num: number = 3
  ): Promise<IBook[]> {
    const requiredObj: any = {};
    const returnArray: IBook[] = [];
    // if (num > Object.keys(object).length) {
    //   return false;
    // }
    Object.keys(object)
      .sort((a, b) => object[b] - object[a])
      .forEach((key, ind) => {
        if (ind < num) {
          requiredObj[key] = object[key];
        }
      });

    for (const property in requiredObj) {
      let book = await this.bookRepository.getOneById(property);
      returnArray.push(book);
    }

    return returnArray;
  }
}
