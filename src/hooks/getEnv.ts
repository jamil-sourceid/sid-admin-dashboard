"use server";

export async function getServerEnv() {
  // Mutate data
  const AES_ENCRYPTION_MASTER_KEY = process.env.AES_ENCRYPTION_MASTER_KEY || "";
  const AES_ENCRYPTION_MASTER_IV = process.env.AES_ENCRYPTION_MASTER_IV || "";

  return {
    AES_ENCRYPTION_MASTER_KEY: (AES_ENCRYPTION_MASTER_KEY as string) || "",
    AES_ENCRYPTION_MASTER_IV: (AES_ENCRYPTION_MASTER_IV as string) || "",
  };
}
