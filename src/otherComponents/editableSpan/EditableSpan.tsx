import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import s from './EditableSpan.module.css';
import { TextField } from '@mui/material';
import { StatusType } from '../../store/app-reducer';

type EditableSpanPropsType = {
  title: string;
  statusTodo: StatusType;
  statusLoad?: StatusType;
  editTitle: (newTitle: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log('EditableSpan');
  const [editMode, setEditMode] = useState(false);
  const { title, editTitle, statusTodo, statusLoad } = props;
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>('');
  const valueTrim = value.trim();

  const onDoubleClickHanlder = () => {
    setEditMode(true);
    setValue(title);
  };

  const onBlurHanlder = useCallback(() => {
    if (valueTrim) {
      if (valueTrim !== title) {
        editTitle(value);
      }
      setEditMode(false);
    } else {
      setError('Incorrect input');
    }
  }, [valueTrim, title]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setError('');
  }, []);

  const onKeyDownHanlder = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (valueTrim) {
          if (valueTrim !== title) {
            editTitle(value);
          }
          setEditMode(false);
        } else {
          setError('Incorrect input');
        }
      }
    },
    [valueTrim, title]
  );

  return (
    <div className={s.editWrapper}>
      {editMode && statusTodo !== 'loading' && statusLoad !== 'loading' ? (
        <TextField
          className={s.textField}
          error={!!error}
          variant='filled'
          autoFocus
          onBlur={onBlurHanlder}
          onKeyDown={onKeyDownHanlder}
          onChange={onChangeHandler}
          value={value}
          placeholder={error ? error : ''}
        />
      ) : (
        <span onDoubleClick={onDoubleClickHanlder}>{title}</span>
      )}
    </div>
  );
});
