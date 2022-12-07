import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchCharacters,
  selectCharacters,
  initialPage,
  updateSearch,
} from "../../app/charactersSlice";
import "./search.css";

export function Search() {
  const store = useAppSelector(selectCharacters);
  const dispatch = useAppDispatch();

  const search = (event: { target: { value: string } }) => {
    dispatch(initialPage());
    dispatch(updateSearch(event?.target.value));
    dispatch(fetchCharacters());
  };

  return (
    <div className="search-container">
      <input
        placeholder="Search"
        className="search-input"
        type="text"
        onChange={(event) => search(event)}
      />
    </div>
  );
}
