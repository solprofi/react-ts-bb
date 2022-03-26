import React from 'react';

import {
  Snackbar,
  Alert,
} from '@mui/material';

type ToastProps = {
  autoHideDuration?: number
  type?: 'info' | 'success' | 'warning' | 'error'
  isToastOpen: boolean
  onClose: () => void
  text: string
}

const Toast = (props: ToastProps) => {
  const {
    autoHideDuration = 3000,
    type = 'info',
    isToastOpen,
    onClose,
    text,
  } = props;

  return (
    <Snackbar
      open={isToastOpen}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={type}
        sx={{ width: '100%' }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
