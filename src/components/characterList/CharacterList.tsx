import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { CharacterItem } from "../characterItem/CharacterItem";
import { Pagination } from "../pagination/Pagination";
import {
  selectCharacters,
  fetchCharacters,
  characterItem,
} from "../../app/charactersSlice";
import "./characterList.css";
import { useEffect } from "react";

export function CharacterList() {
  const store = useAppSelector(selectCharacters);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch, store.searchString, store.page]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Species</th>
            <th>Location</th>
            <th>Episodes</th>
          </tr>
        </thead>
        <tbody>
          {store.results &&
            store.results.map((characterItem: characterItem) => (
              <CharacterItem key={characterItem.id} {...characterItem} />
            ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
