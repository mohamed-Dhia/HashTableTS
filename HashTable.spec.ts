import HashTable from './HashTable';

describe('HashTable', () => {
    let hash: HashTable;
    beforeEach(() => {
        hash = new HashTable(8);
    });

    it('should have size and numberOfElements property', () => {
        expect(hash).toHaveProperty('_size');
        expect(hash).toHaveProperty('_numberOfElement');
    });
    it('should have the methods:  ', () => {
        expect(hash).toHaveProperty('getItem');
        expect(hash).toHaveProperty('setItem');
    });
    it('should have the inputed size', () => {
        expect(hash.size).toEqual(8);
        hash = new HashTable(13);
        expect(hash.size).toEqual(13);
    });
    it('should correctly input elements and retrive it', () => {
        hash.setItem('jhon', 'doe');
        expect(hash.getItem('jhon')).toEqual('doe');
    });

    it('should retun null for non existing keys', () => {
        expect(hash.getItem('jhon')).toBeNull();
        expect(hash.getItem('doe')).toBeNull();
    });
    it('should properly handle collision', () => {
        hash = new HashTable(3);
        hash.setItem('hi', 'jhon');
        hash.setItem('ho', 'doe');
        hash.setItem('yo', 'jhonny');
        expect(hash.getItem('hi')).toEqual('jhon');
        expect(hash.getItem('ho')).toEqual('doe');
        expect(hash.getItem('yo')).toEqual('jhonny');
    });
    it('should correctly remove Items', () => {
        hash = new HashTable(3);
        hash.setItem('hi', 'jhon');
        hash.setItem('ho', 'doe');
        hash.setItem('yo', 'jhonny');
        expect(hash.getItem('hi')).toEqual('jhon');
        hash.removeItem('hi');
        expect(hash.getItem('hi')).toBeNull();
        expect(hash.getItem('ho')).toEqual('doe');
        hash.removeItem('ho');
        expect(hash.getItem('ho')).toBeNull();
        expect(hash.getItem('yo')).toEqual('jhonny');
        hash.removeItem('yo');
        expect(hash.getItem('yo')).toBeNull();
    });
    it('should corectly count the number of elements', () => {
        expect(hash.numberOfElement).toEqual(0);
        hash.setItem('hi', 'jhon');
        hash.setItem('ho', 'doe');
        hash.setItem('yo', 'jhonny');
        expect(hash.numberOfElement).toEqual(3);
        hash.removeItem('yo');
        expect(hash.numberOfElement).toEqual(2);
        hash.setItem('hi', 'jhon2');
        expect(hash.numberOfElement).toEqual(2);
    });
    it('should double the size of the table if it exeedes 75% and get elements correctly', () => {
        hash = new HashTable(4);
        hash.setItem('hi', 'jhon');
        hash.setItem('ho', 'doe');
        hash.setItem('yo', 'jhonny');
        expect(hash.size).toBe(8);
        expect(hash.getItem('hi')).toEqual('jhon');
        expect(hash.getItem('ho')).toEqual('doe');
        expect(hash.getItem('yo')).toEqual('jhonny');
    });
    it("should half the size of the table if it's below 25% and get elements correctly", () => {
        hash = new HashTable(4);
        hash.setItem('hi', 'jhon');
        expect(hash.size).toBe(2);
        expect(hash.getItem('hi')).toBe('jhon');
    });
    it('should iterate over all of the elements', () => {
        hash = new HashTable(4);
        hash.setItem('hi', 'jhon');
        hash.setItem('ho', 'doe');
        hash.setItem('yo', 'jhonny');
        const arr: ([string, unknown] | [])[] = [];
        hash.each(<T>(tuple: [string, T] | []): void => {
            arr.push(tuple);
        });
        expect(arr).toEqual([
            ['hi', 'jhon'],
            ['ho', 'doe'],
            ['yo', 'jhonny'],
        ]);
    });
});
