import { useEffect, useState } from "react";
import { characterItem, fetchEpisodes } from "../../app/charactersSlice";
import { useAppDispatch } from "../../app/hooks";
import "./characterItem.css";

export function CharacterItem(item: characterItem) {
  const [collapsed, setToggle] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEpisodes(item));
  }, []);
  return (
    <>
      <tr onClick={() => setToggle(!collapsed)}>
        <td>{item.name}</td>
        <td>{item.gender}</td>
        <td>{item.status}</td>
        <td>{item.species}</td>
        <td>{item.location?.name}</td>
        <td>{item.episode?.length}</td>
      </tr>
      {collapsed && (
        <tr>
          <td className="collapsable-body">
            <img className="detailed-image" src={item.image} alt="" />
            <div className="detailed-info">
              <span>Name: {item.name}</span>
              <span>Geander: {item.gender}</span>
              <span>Status: {item.status}</span>
              <span>Species: {item.species}</span>
            </div>
            <div>
              Episodes:
              <br />
              {item.episode &&
                item.episode?.map((episode) => (
                  <span key={episode}> {episode}</span>
                ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
