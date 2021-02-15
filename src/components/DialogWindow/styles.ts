import { amber, blue, green, grey } from '@material-ui/core/colors';
import { createStyles, Theme } from '@material-ui/core/styles';

/**
 * Main styles for Dialog window
 * @returns {StyleRules<{}, "success" | "warning" | "error" | "loading" | "info">}
 */
export const mainStyles = (theme: Theme) => createStyles({
  icon: {
    fontSize: 35,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
});

/**
 * Styles for icons in Dialog window
 * @param {Theme} theme - MUI theme object
 * @returns {StyleRules<{}, "success" | "warning" | "error" | "loading" | "info">}
 */
export const iconStyles = (theme: Theme) => createStyles({
  error: {
    color: theme.palette.error.dark,
  },
  warning: {
    color: amber[600],
  },
  success: {
    color: green[600],
  },
  info: {
    color: blue[600],
  },
  loading: {
    color: grey[600],
  },
});
