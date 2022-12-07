import charactersReducer, {
  characterState,
  nextPage,
  previousPage,
  fetchCharacters,
} from "./charactersSlice";

describe("counter reducer", () => {
  const initialState: characterState = {
    results: [],
    info: {
      next: "nextUrl",
      prev: "prevUrl",
    },
    page: 2,
    searchString: "",
  };
  it("should handle initial state", () => {
    expect(charactersReducer(undefined, { type: "unknown" })).toEqual({
      results: [],
      info: {},
      page: 1,
      searchString: "",
    });
  });

  // it("should retrieve the results", () => {
  //   const actual = charactersReducer(initialState, fetchCharacters());
  //   expect(actual.itemsCount).toEqual(5);
  // });

  it("should swith to next page", () => {
    const actual = charactersReducer(initialState, nextPage());
    expect(actual.page).toEqual(3);
  });

  it("should switch to previous page", () => {
    const actual = charactersReducer(initialState, previousPage());
    expect(actual.page).toEqual(1);
  });
});
