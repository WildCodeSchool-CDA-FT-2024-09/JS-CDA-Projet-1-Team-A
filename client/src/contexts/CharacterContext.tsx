import { createContext, useState, ReactNode } from "react";

interface CharacterContextType {
  character: string;
  setCharacter: (character: string) => void;
}

interface CharacterProviderProps {
  children: ReactNode;
}

export const CharacterContext = createContext<CharacterContextType>({
  character: "",
  setCharacter: () => {},
});

export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [character, setCharacter] = useState<string>("");

  return (
    <CharacterContext.Provider value={{ character, setCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};
