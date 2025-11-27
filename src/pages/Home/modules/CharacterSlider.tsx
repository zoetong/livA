import type { Character } from "@/types/Character";
import { Spin, Popover } from "antd";
import { cn } from "@/utils/style_utils";

type CharacterSliderProps = {
  characterList: Character[];
  currentCharacter: Character | null;
  changeCharacter: (character: Character) => void;
};

const CharacterSlider = ({
  characterList,
  currentCharacter,
  changeCharacter,
}: CharacterSliderProps) => {
  return (
    <div className="w-full h-full rounded-md bg-white/10 p-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] overflow-hidden">
      {characterList.length > 0 && currentCharacter ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1">
          {characterList.map((character) => (
            <Popover
              key={character.id}
              content={
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-[200px] h-[264px] object-cover rounded-2xl overflow-hidden"
                />
              }
              placement="left"
              align={{ offset: [-15, 0] }}
              arrow={false}
            >
              <div
                key={character.id}
                className={cn(
                  "w-full transition-all duration-300 cursor-pointer hover:scale-110 overflow-hidden",
                  character.id === currentCharacter.id
                    ? "h-[76px] w-[76px] rounded-full"
                    : "shadow-[0_0_13.5px_0_rgba(0,0,0,0.25)] opacity-70 h-7 rounded-[50%]"
                )}
                onClick={() => changeCharacter(character)}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className={cn(
                    "w-full h-full object-cover",
                    character.id === currentCharacter.id
                      ? "rounded-full"
                      : "rounded-[50%]"
                  )}
                />
              </div>
            </Popover>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Spin size="small" />
        </div>
      )}
    </div>
  );
};

export default CharacterSlider;
