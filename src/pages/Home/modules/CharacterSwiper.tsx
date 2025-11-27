import React, { useEffect, useRef, useState } from "react";
import type { Character } from "@/types/Character";
import CommonButton from "@/components/Common/Button";
import IconArrow from "@/assets/svg/IconArrow.svg?react";
import { cn } from "@/utils/style_utils";
import { useTranslation } from "react-i18next";
import IconAudioOff from "@/assets/svg/IconAudioOff.svg?react";
import IconAudioOn from "@/assets/svg/IconAudioOn.svg?react";
import IconChat from "@/assets/svg/IconChat.svg?react";
import { useNavigate } from "react-router-dom";

type CharacterSwiperProps = {
  characterList: Character[];
  changeCharacter: (character: Character) => void;
  currentCharacter: Character | null;
};

const CharacterSwiper: React.FC<CharacterSwiperProps> = ({
  characterList,
  currentCharacter,
  changeCharacter,
}) => {
  const { t } = useTranslation();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [mutedAll, setMutedAll] = useState<boolean>(false);
  const navigate = useNavigate();
  const goNext = () => {
    if (currentCharacter) {
      const currentIndex = characterList.findIndex(
        (ch: Character) => ch.id === currentCharacter.id
      );
      const nextIndex =
        currentIndex >= characterList.length - 1 ? 0 : currentIndex + 1;
      changeCharacter(characterList[nextIndex]);
    }
  };
  const goPrev = () => {
    if (currentCharacter) {
      const currentIndex = characterList.findIndex(
        (ch: Character) => ch.id === currentCharacter.id
      );
      const prevIndex =
        currentIndex <= 0 ? characterList.length - 1 : currentIndex - 1;
      changeCharacter(characterList[prevIndex]);
    }
  };
  const getCardClass = (character: Character) => {
    const curIdx = characterList.findIndex(
      (c) => c.id === currentCharacter?.id
    );
    const idx = characterList.findIndex((c) => c.id === character.id);
    if (curIdx === -1 || idx === -1) return "";
    const offset = idx - curIdx; // -3..3
    const base = cn(
      "absolute w-[380px] max-w-[90vw] h-full bg-transparent rounded-[16px] ",
      "shadow-[0_8px_32px_#00000026] overflow-hidden opacity-0 pointer-events-none ",
      "transition-[transform,opacity,filter] duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform ",
      "cursor-pointer [transform-style:preserve-3d] origin-bottom left-1/2 bottom-[-30px] -ml-[190px] box-border",
      "group flex flex-col"
    );
    if (offset === 0) {
      return cn(
        base,
        "[transform:scale(1.05)_rotate(0deg)_translateY(0)] z-[10] blur-0 opacity-100 pointer-events-auto",
        "hover:[transform:scale(1.07)_rotate(0deg)] hover:shadow-[0_16px_48px_#00000040] duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
      );
    }
    const map: Record<number, string> = {
      [-3]: "[transform:scale(0.8)_rotate(-60deg)_translateY(-150px)] z-[1] blur-[6px] opacity-100 pointer-events-auto",
      [-2]: "[transform:scale(0.8)_rotate(-40deg)_translateY(-170px)] z-[2] blur-[4px] opacity-100 pointer-events-auto",
      [-1]: "[transform:scale(0.8)_rotate(-20deg)_translateY(-200px)] z-[3] blur-[2px] opacity-100 pointer-events-auto",
      [1]: "[transform:scale(0.8)_rotate(20deg)_translateY(-200px)] z-[3] blur-[2px] opacity-100 pointer-events-auto",
      [2]: "[transform:scale(0.8)_rotate(40deg)_translateY(-170px)] z-[2] blur-[4px] opacity-100 pointer-events-auto",
      [3]: "[transform:scale(0.8)_rotate(60deg)_translateY(-150px)] z-[1] blur-[6px] opacity-100 pointer-events-auto",
    };
    return cn(base, map[offset] ?? "");
  };

  const playOnly = (idx: number) => {
    const v = videoRefs.current[idx];
    if (v) {
      v.muted = mutedAll;
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  const handleChat = (character: Character) => {
    console.log(character);
    navigate(`/live?characterId=${character.id}`);
  };

  // keep refs in sync with global mute
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) v.muted = mutedAll;
    });
  }, [mutedAll, characterList]);

  // no pause behavior on character change
  return (
    <div className={cn("relative w-full h-full flex flex-col pt-[72px]")}>
      {characterList.length > 0 && currentCharacter && (
        <div
          className={cn(
            "flex-1 relative flex items-end justify-center h-full",
            "[perspective:1200px] [transform-style:preserve-3d] pb-[100px] mx-auto translate-y-[-40px]"
          )}
        >
          {characterList.map((character: Character, idx: number) => {
            const curIdx = characterList.findIndex(
              (c) => c.id === currentCharacter?.id
            );
            const isCenter = idx === curIdx;
            return (
              <div key={character.id} className={getCardClass(character)}>
                <div
                  className="w-full aspect-[2/3] overflow-hidden bg-transparent mt-0 rounded-t-[16px] relative flex-1"
                  onMouseEnter={() => {
                    if (isCenter) {
                      playOnly(idx);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isCenter) {
                      const v = videoRefs.current[idx];
                      if (v) {
                        v.pause();
                      }
                    }
                  }}
                >
                  <video
                    src={character.voice}
                    autoPlay={false}
                    loop
                    muted={mutedAll}
                    playsInline
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    className="w-full h-full object-cover relative z-0"
                  />

                  {isCenter && (
                    <>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                        <CommonButton
                          size="large"
                          className="h-14 px-0 hover:scale-110 transition-transform duration-300"
                          borderRadiusPx={54}
                          onClick={() => {
                            handleChat(character);
                          }}
                        >
                          <span className="text-2xl font-medium text-[#333] flex items-center gap-4 justify-center px-10">
                            {t("common.chat")}
                            <IconChat className="w-6 h-6" />
                          </span>
                        </CommonButton>
                      </div>
                      <div className="absolute bottom-3 right-4 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                        <CommonButton
                          borderRadiusPx={42}
                          className="h-10 w-10 p-0 bg-white/60 hover:scale-110 transition-transform duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMutedAll((prev) => !prev);
                          }}
                        >
                          {mutedAll ? (
                            <IconAudioOff className="w-5 h-5" />
                          ) : (
                            <IconAudioOn className="w-5 h-5" />
                          )}
                        </CommonButton>
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full h-[120px] bg-[#ffffff] p-3 flex flex-col justify-center gap-2">
                  <div className="w-full h-5 text-base font-medium">
                    {character.name}
                  </div>
                  {/* 描述  */}
                  <div className="w-full text-sm text-gray-500 line-clamp-3 ">
                    {character.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {characterList.length > 1 && currentCharacter && (
        <div className="w-full flex items-center justify-center gap-4">
          <CommonButton
            onClick={goPrev}
            className="w-12 h-12 p-0"
            borderRadiusPx={54}
            disabled={currentCharacter?.id === characterList[0].id}
          >
            <IconArrow className="w-6 h-6 transform rotate-180" />
          </CommonButton>
          <CommonButton
            onClick={goNext}
            className="w-12 h-12 p-0"
            borderRadiusPx={54}
            disabled={
              currentCharacter?.id ===
              characterList[characterList.length - 1].id
            }
          >
            <IconArrow className="w-6 h-6" />
          </CommonButton>
        </div>
      )}
    </div>
  );
};

export default CharacterSwiper;
