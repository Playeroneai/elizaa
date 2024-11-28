import { IAgentRuntime, Memory, Provider, State } from "@ai16z/eliza";
import { Keypair } from "@solana/web3.js";
import crypto from "crypto";
import { TappdClient } from "@phala/dstack-sdk";

class DeriveKeyProvider {
    private client: TappdClient;

    constructor(endpoint?: string) {
        this.client = endpoint ? new TappdClient(endpoint) : new TappdClient();
    }

    async deriveKey(path: string, subject: string): Promise<Keypair> {
        try {
            if (!path || !subject) {
                console.error("Path and Subject are required for key derivation");
            }

            console.log("Deriving Key in TEE...");
            const derivedKey = await this.client.deriveKey(path, subject);
            const uint8ArrayDerivedKey = derivedKey.asUint8Array();
            
            const hash = crypto.createHash("sha256");
            hash.update(uint8ArrayDerivedKey);
            const seed = hash.digest();
            const seedArray = new Uint8Array(seed);
            const keypair = Keypair.fromSeed(seedArray.slice(0, 32));
            
            console.log("Key Derived Successfully!");
            return keypair;
        } catch (error) {
            console.error("Error deriving key:", error);
            throw error;
        }
    }
}

const deriveKeyProvider: Provider = {
    get: async (runtime: IAgentRuntime, _message?: Memory, _state?: State) => {
        const endpoint = runtime.getSetting("DSTACK_SIMULATOR_ENDPOINT");
        const provider = new DeriveKeyProvider(endpoint);
        try {
            // Validate wallet configuration
            if (!runtime.getSetting("WALLET_SECRET_SALT")) {
                console.error(
                    "Wallet secret salt is not configured in settings"
                );
                return "";
            }

            let keypair: Keypair;
            try {
                const secretSalt =
                    runtime.getSetting("WALLET_SECRET_SALT") || "secret_salt";
                    return await provider.deriveKey("/", secretSalt);
            } catch (error) {
                console.error("Error creating PublicKey:", error);
                return "";
            }

            return keypair;
        } catch (error) {
            console.error("Error in derive key provider:", error.message);
            return `Failed to fetch derive key information: ${error instanceof Error ? error.message : "Unknown error"}`;
        }
    },
};

export { deriveKeyProvider, DeriveKeyProvider };