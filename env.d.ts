/* eslint-disable */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /* --------------------------------- Examples --------------------------------- */
      NEXT_PUBLIC_BASE_API_URL: string;
      NEXT_PUBLIC_API_URL: string;
      FIREBASE_KEY: string;
    }
  }
}

export {};
