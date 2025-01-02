import { ChangeEvent, useState } from "react";
import Button from "@/components/Button";
import Chip from "@/components/Chip";
import { GAME_CREATE_ROOM, GAME_JOIN_ROOM } from "@/constants";

import { useSocketContext } from "@/contexts/socket/index.hook";

import * as css from "./View.styles";
import { HomeProps } from "./View.types";
import { useMainContext } from "@/contexts/main/index.hook";
import Template from "@/components/Template";

const Home = ({ rooms }: HomeProps) => {
  const { userId } = useMainContext();
  const { handleSendToWS } = useSocketContext();

  const [search, setSearch] = useState("");
  const validRooms = search
    ? rooms.filter((item) => String(item.id).includes(search))
    : rooms;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/\D/.test(value)) return;
    setSearch(value);
  };

  const handleCreatRoom = () => {
    handleSendToWS({ type: GAME_CREATE_ROOM });
  };

  const handleJoinRoom = (value: number) => {
    handleSendToWS({ type: GAME_JOIN_ROOM, value: { roomId: value } });
  };

  return (
    <Template>
      <>
        <input
          type="search"
          placeholder="Search room..."
          value={search}
          className={css.inputModifier}
          onChange={handleChangeInput}
        />
      </>
      <div className={css.roomList}>
        {validRooms.length > 0
          ? validRooms.map((item, index) => (
              <Chip
                key={`room-${index}`}
                disabled={!userId}
                onClick={() => handleJoinRoom(item.id)}
              >
                {item.id}
              </Chip>
            ))
          : "No room available..."}
      </div>
      <div className={css.btnContainer}>
        <Button disabled={!userId} onClick={handleCreatRoom}>
          Create Room
        </Button>
      </div>
    </Template>
  );
};

export default Home;
