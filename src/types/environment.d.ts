export{};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE: string;
      DATABASE_PASSWORD: string;
      USERNAME: string;
    }
  }
}