/* eslint-disable @typescript-eslint/no-explicit-any */
import { text2imageConvert, imageModification } from "../api/axios";

interface IText2Image {
  prompt: string;
  ratio: string;
  stylePreset?: string;
  negativePrompt?: string;
}

export const imageGeneration = async (promptData: IText2Image) => {
  try {
    const { data } = await text2imageConvert(promptData);
    const imageLink: string = data.data.link;
    return imageLink;
  } catch (error: any) {
    console.log(error);

    if (error?.response?.status === 403) {
      alert("Unauthorized || cant use Without Login");
    } else {
      alert("Error in image Generation");
    }
  }
};

export const imageModificationGeneration = async (promptData: FormData) => {
  try {
    const { data } = await imageModification(promptData);
    const imageLink: string = data.data.link;
    return imageLink;
  } catch (error: any) {
    console.log(error);
    if (error?.response?.status === 403) {
      alert("Unauthorized || cant use Without Login");
    } else {
      alert("Error in image modification");
    }
  }
};
