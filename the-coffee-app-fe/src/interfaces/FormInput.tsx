import React from 'react';

export interface InputParams {
  event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
  body?: { name: string; value: string | number | File };
}
