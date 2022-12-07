import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchCharacters, selectCharacters } from "../../app/charactersSlice";
import { nextPage, previousPage } from "../../app/charactersSlice";
import "./pagination.css";
export function Pagination() {
  const store = useAppSelector(selectCharacters);
  const dispatch = useAppDispatch();

  return (
    <div className="pagination-container">
      <IoIosArrowBack onClick={() => dispatch(previousPage())} />
      <span>
        {store.page}/ {store.info.pages}
      </span>
      <IoIosArrowForward onClick={() => dispatch(nextPage())} />
    </div>
  );
}
