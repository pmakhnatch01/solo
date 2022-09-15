export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE: string;
      DATABASE_PASSWORD: string;
      USERNAME: string;
      DB_PORT: string;
      DB_USER: string;
      ENV: string;
    }
  }
}
