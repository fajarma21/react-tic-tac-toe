import { SocketContext } from "./index.hook";
import type { SocketProviderProps } from "./index.types";

const SocketProvider = ({ children, onSendToWS }: SocketProviderProps) => {
  return (
    <SocketContext.Provider
      value={{
        handleSendToWS: onSendToWS,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
