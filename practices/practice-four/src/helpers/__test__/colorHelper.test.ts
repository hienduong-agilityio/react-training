// Helpers
import { getColorClasses } from '@/helpers/colorHelper';

// Enums
import { COLORS } from '@/enums/theme';

// Constants
import { COLORS_CLASS } from '@/constants/color';

describe('getColorClasses', () => {
  it('should return primary class for PRIMARY color', () => {
    const className = getColorClasses(COLORS.PRIMARY);
    expect(className).toEqual(COLORS_CLASS.PRIMARY);
  });

  it('should return default class for undefined color', () => {
    const className = getColorClasses();
    expect(className).toEqual(COLORS_CLASS.DEFAULT);
  });
});
