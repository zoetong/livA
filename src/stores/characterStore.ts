import { create } from "zustand";
import { CreateStatus, type Character } from "../types";
import { Ratio } from "@/types/Live";

type CharacterStore = {
  createStatus: CreateStatus;
  setCreateStatus: (createStatus: CreateStatus) => void;
  imageInfo: File | null;
  setImageInfo: (imageInfo: File | null) => void;
  ratio: Ratio;
  setRatio: (ratio: Ratio) => void;
  characterInfo: Character | null;
  setCharacterInfo: (characterInfo: Character) => void;
  voiceInfo: File | null;
  setVoiceInfo: (voiceInfo: File) => void;
};

const useCharacterStore = create<CharacterStore>((set) => ({
  createStatus: CreateStatus.INIT,
  imageInfo: null,
  ratio: Ratio.PORTRAIT,
  characterInfo: null,
  voiceInfo: null,

  setRatio: (ratio: Ratio) => {
    set({ ratio });
  },
  setImageInfo: (imageInfo: File | null) => {
    set({ imageInfo });
  },
  setVoiceInfo: (voiceInfo: File) => {
    set({ voiceInfo });
  },
  setCharacterInfo: (characterInfo: Character) => {
    set({ characterInfo });
  },
  setCreateStatus: (createStatus: CreateStatus) => {
    set({ createStatus });
  },
}));

export default useCharacterStore;
