# dialog-notification

## Getting started

### Installation

```shell
npm i dialog-notification
yarn add dialog-notification
```

## Basic usage

**1.** Wrap your `App` with `DialogProvider` component.

```jsx
import { DialogProvider } from 'dialog-notification';

<DialogProvider>
  <App/>
</DialogProvider>
```

**Note**: If you are using Material UI `ThemeProvider`, make sure to wrap your `App` under it.

**2.** Use `withDialog` decorator to access `openDialog` function.

```jsx
import { withDialog } from 'dialog-notification';
import { Button } from '@material-ui/core';

class ClassComponent extends Component {
  render() {
    const { openDialog } = this.props;

    return (
      <Button onClick={() => openDialog('Hello! I am dialog window.')}>
        Open dialog
      </Button>
    );
  }
}

export default withDialog(ClassComponent);
```
**2 (alternative).** You can also use `useDialog` hook to call inside function components.
```jsx
import { useDialog } from 'dialog-notification';
import { Button } from '@material-ui/core';

export default function FuncComponent() {
  const { openDialog } = useDialog();

  return (
    <Button onClick={() => openDialog('Hello! I am dialog window.')}>
      Open dialog
    </Button>
  );
}
```
