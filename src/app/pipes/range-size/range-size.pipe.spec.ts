import { RangeSizePipe } from './range-size.pipe';

describe('RangeSizePipe', () => {
  let pipe: RangeSizePipe;

  beforeEach(() => {
    pipe = new RangeSizePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an array of numbers from 0 to n-1', () => {
    const value = 5;
    const result = pipe.transform(value);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('should return an empty array if 0 is passed', () => {
    const value = 0;
    const result = pipe.transform(value);
    expect(result).toEqual([]);
  });

  it('should return undefined if undefined is passed', () => {
    const result = pipe.transform(undefined);
    expect(result).toBeUndefined();
  });
});
