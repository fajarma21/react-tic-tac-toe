import Button from '@/components/Button';
import {
  STATUS_ALL_JOIN,
  STATUS_BREAK,
  STATUS_END,
  STATUS_FINISH_BREAK,
  STATUS_WAIT,
} from '@/constants';

import * as css from './View.styles';
import { OverlayProps } from './View.types';

const Overlay = ({
  gameStatus,
  userId,
  winnerId,
  onClickFindMatch,
  onClickStart,
}: OverlayProps) => {
  if (STATUS_WAIT.includes(gameStatus)) {
    return (
      <div className={css.overlay}>
        <div className={css.hour} />
      </div>
    );
  }

  if (gameStatus === STATUS_ALL_JOIN) {
    return (
      <div className={css.overlay}>
        <p>Start the game?</p>
        <Button color="orange" onClick={onClickStart}>
          Let's go!
        </Button>
      </div>
    );
  }

  if (STATUS_END.includes(gameStatus)) {
    const isBreak = gameStatus === STATUS_BREAK;
    const isFinishBreak = gameStatus === STATUS_FINISH_BREAK;
    const noOpponent = isBreak || isFinishBreak;
    return (
      <div className={css.overlay}>
        <p className={css.statusResult}>
          {!!winnerId && (
            <b>{`You ${userId === winnerId ? 'win' : 'lose'}!`}</b>
          )}
          {isBreak && <b>You win!</b>}
        </p>
        <Button
          color="orange"
          onClick={noOpponent ? onClickFindMatch : onClickStart}
        >
          {noOpponent ? 'Find Match' : 'Rematch'}
        </Button>
      </div>
    );
  }

  return null;
};

export default Overlay;
