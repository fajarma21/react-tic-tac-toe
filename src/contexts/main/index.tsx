import { MainContext } from "./index.hook";
import type { MainProviderProps } from "./index.types";

const MainProvider = ({ children, ...rest }: MainProviderProps) => {
  return (
    <MainContext.Provider
      value={{
        ...rest,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
