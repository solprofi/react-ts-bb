import React from 'react';
import {
  Typography,
  Paper,
} from '@mui/material';

type EmptyStateProps = {
  text?: string
  elevation?: number
  className?: string
  textVariant?: 'button' | 'caption' | 'h1' | 'h2' | 'h3'
  | 'h4' | 'h5' | 'h6' | 'inherit' | 'subtitle1'
  | 'subtitle2' | 'body1' | 'body2' | 'overline' | undefined
}

const EmptyState = (props: EmptyStateProps) => {
  const {
    text = 'No data available',
    elevation = 3,
    className,
    textVariant,
  } = props;

  return (
    <Paper
      className={className}
      elevation={elevation}
    >
      <Typography
        variant={textVariant}
        component='div'
      >
        {text}
      </Typography>
    </Paper>
  )
}

export default EmptyState;