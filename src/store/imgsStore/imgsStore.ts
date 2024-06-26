import { create } from "zustand";
import { AddedImgsType, PostImgsType } from "../../types/postType.ts";

interface useImgsStoreProps {
  writeImgs: PostImgsType;
  changeImgs: (imgs: File[], isDelete?: boolean) => void;
  deleteImgIds: number[];
  addedDeleteImgIds: (id: number) => void;
  addedImgs: AddedImgsType;
  changeAddedImgs: (imgs: File[], isDelete?: boolean) => void;
}

export const useImgsStore = create<useImgsStoreProps>((set) => ({
  writeImgs: { postImgs: [] as File[] },
  addedImgs: { addedImgs: [] as File[] },
  changeImgs: (imgs: File[] | [], isDelete) =>
    set((prev) => {
      if (prev.writeImgs.postImgs?.length === 0 && prev.writeImgs.postImgs) {
        return {
          writeImgs: {
            ...prev.writeImgs,
            postImgs: imgs,
          },
        };
      } else if (prev.writeImgs.postImgs !== null && !isDelete) {
        return {
          writeImgs: {
            postImgs: [...prev.writeImgs.postImgs, ...imgs],
          },
        };
      } else if (isDelete) {
        if (imgs.length === 0) {
          return {
            writeImgs: {
              postImgs: [],
            },
          };
        }
        return {
          writeImgs: {
            postImgs: imgs,
          },
        };
      }
      return prev;
    }),
  changeAddedImgs: (imgs: File[], isDelete) =>
    set((prev) => {
      if (prev.addedImgs.addedImgs?.length === 0) {
        return {
          addedImgs: {
            ...prev.addedImgs,
            addedImgs: imgs,
          },
        };
      } else if (prev.addedImgs.addedImgs !== null && !isDelete) {
        return {
          addedImgs: {
            addedImgs: [...prev.addedImgs.addedImgs, ...imgs],
          },
        };
      } else if (isDelete) {
        return {
          addedImgs: {
            addedImgs: imgs,
          },
        };
      }
      return prev;
    }),
  deleteImgIds: [],
  addedDeleteImgIds: (id) =>
    set((prev) => ({
      deleteImgIds: [...prev.deleteImgIds, id],
    })),
}));
