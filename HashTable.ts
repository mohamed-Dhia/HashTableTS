export default class HashTable<T> {
    private _numberOfElement: number;
    private storage: [string, T][][];
    constructor(private _size: number) {
        this._numberOfElement = 0;
        this.storage = this.createEmptyStorage();
    }

    get size() {
        return this._size;
    }

    get numberOfElement() {
        return this._numberOfElement;
    }

    private createEmptyStorage() {
        return Array.from<[string, T][]>({ length: this._size });
    }

    private hashStringToInt(key: string): number {
        let hash = 37;
        for (let i = 0; i < key.length; i++) {
            hash = 19 * hash * key.charCodeAt(i);
        }
        return hash % this._size;
    }

    setItem(key: string, value: T, resize = true) {
        const index = this.hashStringToInt(key);
        this.storage[index] = this.storage[index] || [];
        const newbucket: [string, T][] = [...this.storage[index].filter(([tableKey]) => tableKey !== key), [key, value]];
        newbucket.length > this.storage[index].length && this._numberOfElement++;
        this.storage[index] = newbucket;
        if (resize) {
            if (this._numberOfElement >= (this._size * 3) / 4) {
                this.resize(this._size * 2);
            } else if (this._numberOfElement <= this._size / 4) {
                this.resize(this._size / 2);
            }
        }
    }

    getItem(key: string) {
        const index = this.hashStringToInt(key);
        return this.storage[index]?.find((tuple) => tuple[0] === key)?.[1] ?? null;
    }

    removeItem(key: string) {
        const index = this.hashStringToInt(key);
        const newBucket = this.storage[index].filter((tuple) => tuple[0] !== key);
        newBucket.length - this.storage[index].length && (this.storage[index] = newBucket) && this._numberOfElement--;
    }

    resize(newSize: number) {
        const allItems: [string, T][] = [];
        this.each((tuple) => {
            allItems.push(tuple);
        });
        this._size = newSize;
        this._numberOfElement = 0;
        this.storage = this.createEmptyStorage();
        allItems.forEach((tuple) => {
            this.setItem(...tuple, false);
        });
    }

    each(cb: (tuple: [string, T]) => void) {
        this.storage.forEach((bucket) => {
            bucket = bucket || [];
            bucket.forEach((tuple) => {
                cb(tuple);
            });
        });
    }

    *eachGenerator(cb: (tuple: [string, T]) => unknown) {
        let i = 0
        while (i < this.storage.length) {
            const bucket = this.storage[i] || []
            let j = 0
            while (j < bucket.length) {
                const tuple = bucket[j]
                yield cb(tuple)
                j++
            }
            i++
        }
    }
}
