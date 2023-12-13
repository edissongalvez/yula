const tintColorLight = '#007AFF';
const tintColorDark = '#0A84FF';

export default {
  light: {
    text: '#000',
    textSecondary: 'rgba(60,60,67,.6)',
    textTertiary: 'rgba(60,60,67,.3)',
    textQuanternary: 'rgba(60,60,67,.18)',
    background: '#FFFFFF',
    backgroundSecondary: '#F2F2F7',
    backgroundTertiary: '#FFFFFF',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,

    separatorOpaque: '#C6C6C8',
    separatorNonOpaque: 'rgba(60,60,67,.36)'
  },
  dark: {
    text: '#fff',
    textSecondary: 'rgba(235,235,245,.6)',
    textTertiary: 'rgba(235,235,245,.3)',
    textQuanternary: 'rgba(235,235,245,.16)',
    background: '#000',
    backgroundSecondary: '#1C1C1E',
    backgroundTertiary: '#2C2C2E',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,

    separatorOpaque: '#383858',
    separatorNonOpaque: 'rgba(84,84,88,.65)'
  },
};
