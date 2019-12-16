export declare function keccakHash(): Promise<{
    update: (data: string | number[] | Uint8Array) => void;
    digest: {
        (): string;
        (hexResult: false): Uint8Array;
        (hexResult: true): string;
    };
}>;
export default keccakHash;
