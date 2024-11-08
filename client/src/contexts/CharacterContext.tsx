import { createContext, useState, PropsWithChildren } from "react";
import { Profession, TemporaryCompetitor } from "../generated/graphql-types";

interface CharacterContextType {
  character: InputCharacter;
  setCharacter: (character: InputCharacter) => void;
  tempCharacter: TemporaryCompetitor | null;
  setTempCharacter: (tempCharacter: TemporaryCompetitor | null) => void;
}

type InputCharacter = {
  name: string;
  profession: Profession | "";
  avatar: string;
};

export const CharacterContext = createContext<CharacterContextType>({
  character: {
    name: "",
    profession: "",
    avatar: "",
  },
  setCharacter: () => {},
  tempCharacter: null,
  setTempCharacter: () => {},
});

const initialCharacter: InputCharacter = {
  name: "",
  profession: "",
  avatar: "",
};

export const CharacterProvider = ({ children }: PropsWithChildren) => {
  const [character, setCharacter] = useState<InputCharacter>(initialCharacter);
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
