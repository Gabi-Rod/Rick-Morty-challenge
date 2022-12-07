import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface characterItem {
  id?: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: {
    name: string;
    url: string;
  };
  location?: {
    name: string;
    url: string;
  };
  image?: string;
  episode?: string[];
  episodes?: episodeItem[];

  url?: string;
  created?: string;
}

export interface episodeItem {
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
}

export interface info {
  count?: number;
  pages?: number;
  next?: string | null;
  prev?: string | null;
}

export interface characterState {
  results: characterItem[];
  info: info;
  page: number;
  searchString: "";
}

const initialState: characterState = {
  results: [],
  info: {},
  page: 1,
  searchString: "",
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const page = state.characters.page;
    const searchstring = state.characters.searchString;
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchstring}`
    );
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  }
);
export const fetchEpisodes = createAsyncThunk(
  "episodes/fetchEpisodes",
  async (item: characterItem, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const stateItem = state.characters.results.find(
      (character) => character.id === item.id
    );
    const postData = [] as episodeItem[];
    stateItem?.episode?.map(async (ep) => {
      const response = await fetch(`${ep}`);

      const data = await response.json();
      postData.push(data);
    });

    console.log("fetched episodes", postData);
    return { postData, item };
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    nextPage: (state) => {
      if (state.info.next) {
        state.page += 1;
      }
    },
    previousPage: (state) => {
      if (state.info.prev) {
        state.page -= 1;
      }
    },
    initialPage: (state) => {
      state.page = 1;
    },
    updateSearch: (state, action) => {
      state.searchString = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.info = action.payload.info;
      state.results = action.payload.results;
    });
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      // let stateItem = state.results.find(
      //   (character) => character.id === action.payload.item.id
      // );
      // stateItem = action.payload.postData;
    });
  },
});

export const { nextPage, previousPage, initialPage, updateSearch } =
  charactersSlice.actions;
export const selectCharacters = (state: RootState) => state.characters;

export default charactersSlice.reducer;
