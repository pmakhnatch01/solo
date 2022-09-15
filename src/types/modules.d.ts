declare namespace NodeJS {
  export interface ProcessEnv {
    HOST: string;
    DB_URL: string;
    DB_NAME?: string;
    PORT: string;
    DATABASE: string;
    DATABASE_PASSWORD: string;
    USERNAME: string;
    DB_PORT: string;
    DB_USER: string;
    ENV: string;
  }
}
