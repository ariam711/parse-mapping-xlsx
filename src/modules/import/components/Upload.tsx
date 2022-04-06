import { Box, Button } from '@mui/material';
import React from 'react';

export type FldUploadImageProps = {
  onChange?(event: { target: HTMLInputElement }): void;
  id?: string;
  disabled?: boolean;
};

function Upload({ onChange, id = 'f10-btn-file-upload', disabled }: FldUploadImageProps) {
  return (
    <label htmlFor={id}>
      {disabled ? (
        <></>
      ) : (
        <Box
          component="input"
          accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          type="file"
          name={id}
          {...{ onChange, id }}
          sx={{ display: 'none' }}
          onClick={(e: any) => e.stopPropagation()}
        />
      )}
      <Button variant="outlined" component="span">
        Choose Files
      </Button>
    </label>
  );
}

export default Upload;
