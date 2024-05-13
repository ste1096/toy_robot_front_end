import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  let pipe: ReversePipe;

  beforeEach(() => {
    pipe = new ReversePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the reversed array', () => {
    const array = [1, 2, 3, 4, 5];
    const reversedArray = pipe.transform(array);
    expect(reversedArray).toEqual([5, 4, 3, 2, 1]);
  });

  it('should return undefined if undefined is passed', () => {
    const reversedArray = pipe.transform(undefined);
    expect(reversedArray).toBeUndefined();
  });
});
