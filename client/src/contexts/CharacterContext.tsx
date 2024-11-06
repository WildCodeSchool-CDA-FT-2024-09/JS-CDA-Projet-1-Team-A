import { createContext, useState, PropsWithChildren } from "react";
import { TemporaryCompetitor } from "../generated/graphql-types";

interface CharacterContextType {
  character: string;
  setCharacter: (character: string) => void;
  tempCharacter: TemporaryCompetitor | null;
  setTempCharacter: (tempCharacter: TemporaryCompetitor | null) => void;
}

export const CharacterContext = createContext<CharacterContextType>({
  character: "",
  setCharacter: () => {},
  tempCharacter: null,
  setTempCharacter: () => {},
});

export const CharacterProvider = ({ children }: PropsWithChildren) => {
  const [character, setCharacter] = useState<string>("");
  const [tempCharacter, setTempCharacter] =
    useState<TemporaryCompetitor | null>(null);

  return (
    <CharacterContext.Provider
      value={{ character, setCharacter, tempCharacter, setTempCharacter }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
