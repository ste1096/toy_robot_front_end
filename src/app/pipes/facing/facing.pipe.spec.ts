import { FacingEnum } from '../../models';
import { FacingPipe } from './facing.pipe';

describe('FacingPipe', () => {
  let pipe: FacingPipe;

  beforeEach(() => {
    pipe = new FacingPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform NORTH enum value to "NORTH"', () => {
    const result = pipe.transform(FacingEnum.NORTH);
    expect(result).toBe('NORTH');
  });

  it('should transform EAST enum value to "EAST"', () => {
    const result = pipe.transform(FacingEnum.EAST);
    expect(result).toBe('EAST');
  });

  it('should transform SOUTH enum value to "SOUTH"', () => {
    const result = pipe.transform(FacingEnum.SOUTH);
    expect(result).toBe('SOUTH');
  });

  it('should transform WEST enum value to "WEST"', () => {
    const result = pipe.transform(FacingEnum.WEST);
    expect(result).toBe('WEST');
  });

  it('should return empty string for unknown enum value', () => {
    const result = pipe.transform(-1 as FacingEnum);
    expect(result).toBe('');
  });
});
