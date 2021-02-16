import { amber, blue, green, grey } from '@material-ui/core/colors';
import { Theme } from '@material-ui/core/styles';

/**
 * Main styles for Dialog window
 * @returns {StyleRules<{}, "icon">}
 */
export default (theme: Theme) => ({
  icon: {
    fontSize: 35,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
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
