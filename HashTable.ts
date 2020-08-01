export default class HashTable {
    private _size: number;
    private _numberOfElement: number;
    private _storage: [string, any][][];
    constructor(_size: number) {
        this._size = _size;
        this._numberOfElement = 0;
        this._storage = this.createEmptyStorage();
    }

    get size(): number {
        return this._size;
    }

    get numberOfElement(): number {
        return this._numberOfElement;
    }

    private createEmptyStorage = (): [][] => {
        return Array.from({ length: this._size }, () => []);
    };

    private hashStringToInt = (key: string): number => {
        let hash = 37;
        for (let i = 0; i < key.length; i++) {
            hash = 19 * hash * key.charCodeAt(i);
        }
        return hash % this._size;
    };

    public setItem = <T>(key: string, value: T, resize = true): void => {
        const index = this.hashStringToInt(key);
        const newbucket: [string, T][] = [
            ...this._storage[index].filter((tuple: [string, T]): boolean => tuple[0] !== key),
            [key, value],
        ];
        newbucket.length > this._storage[index].length && this._numberOfElement++;
        this._storage[index] = newbucket;
        resize &&
            ((this._numberOfElement >= (this._size * 3) / 4 && this.resize(this._size * 2)) ||
                (this.numberOfElement <= this._size / 4 && this.resize(this._size / 2)));
    };

    public getItem = <T>(key: string): T | null => {
        const index = this.hashStringToInt(key);
        return this._storage[index].find((tuple: [string, T] | []): boolean => tuple[0] === key)?.[1] || null;
    };

    public removeItem = <T>(key: string): void => {
        const index = this.hashStringToInt(key);
        const newBucket = this._storage[index].filter((tuple: [string, T]): boolean => tuple[0] !== key);
        newBucket.length - this._storage[index].length && (this._storage[index] = newBucket) && this._numberOfElement--;
    };

    private resize = <T>(newSize: number): void => {
        const allItems: [string, T][] = [];
        this.each((tuple: [string, T]): void => {
            allItems.push(tuple);
        });
        this._size = newSize;
        this._numberOfElement = 0;
        this._storage = this.createEmptyStorage();
        allItems.forEach((tuple: [string, T]): void => {
            this.setItem(...tuple, false);
        });
    };

    public each = <T>(cb: (tuple: [string, T]) => void): void => {
        this._storage.forEach((bucket: [string, T][]) => {
            bucket.forEach((tuple: [string, T]) => {
                cb(tuple);
            });
        });
    };
}
