interface ILoginUser {
  email: string;
  password: string;
}
interface IRegisterUser {
  email: string;
  password: string;
  username: string;
}

interface IText2Image {
  prompt: string;
  ratio: string;
  stylePreset?: string;
  negativePrompt?: string;
}
interface IImage2Image {
  prompt: string;
  testImage: File;
  negativePrompt?: string;
}
