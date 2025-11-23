import type { IrisConfig } from "../../config/types";
/**
 * StorageModule
 * - Uploads files or JSON objects to 0G Storage
 * - Returns dataHash, txHash, downloadUrl
 */
export declare class StorageModule {
    private indexer;
    private signer;
    private rpcUrl;
    constructor(config: IrisConfig);
    /** Upload a JSON object to 0G */
    uploadJSON(data: unknown): Promise<{
        dataHash: any;
        txHash: any;
        downloadUrl: string;
    }>;
    /** Upload a review object (score, comment, reviewer) */
    uploadReview(review: {
        score: number;
        comment: string;
        reviewer: string;
    }): Promise<{
        dataHash: any;
        txHash: any;
        downloadUrl: string;
    }>;
    /** Low-level file upload */
    private uploadFile;
}
