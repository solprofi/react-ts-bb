import React from 'react';

import {
  Snackbar,
  Alert,
} from '@mui/material';

type ToastProps = {
  autoHideDuration?: number
  type?: 'info' | 'success' | 'warning' | 'error'
  isToastOpen: boolean
  setIsToastOpen: (value: string | boolean) => void
  text: string | boolean
}

const Toast = (props: ToastProps) => {
  const {
    setIsToastOpen, 
    text,
    isToastOpen
  } = props;
  
  const onClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsToastOpen(false);
  };

  const {
    autoHideDuration = 3000,
    type = 'info',
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
        data-testid='alert'
      >
        {text}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
