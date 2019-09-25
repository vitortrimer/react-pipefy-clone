import React, { useState } from "react";

import produce from "immer";

import { loadLists } from "../../services/mockApi";
import List from "../List";
import { Container } from "./styles";
import BoardContext from "./context";

const data = loadLists();
export default function Board() {
  const [lists, setLists] = useState(data);

  function move(from, to, fromList, toList) {
    setLists(
      produce(lists, draft => {
        const dragged = draft[fromList].cards[from];
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      })
    );
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => {
          return <List key={list.title} data={list} index={index} />;
        })}
      </Container>
    </BoardContext.Provider>
  );
}
