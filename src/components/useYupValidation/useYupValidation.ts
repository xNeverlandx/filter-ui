// @ts-nocheck
import { uniq } from 'lodash';
import { useState } from 'react';
import * as yup from 'yup';
import {
  deleteFieldAndChildrenErrors,
  getParentAndChildErrorKeys,
  mapValidationErrors,
} from './yupValidationHelpers';

export const useYupValidation = (
  schema: yup.schemaOf<any>,
): {
  validate: (data: any, onValid: any) => void;
  getErrorMessagesByFieldName: (
    fieldNames: string | string[],
  ) => string | undefined;
  clearErrors: (fieldKey?: string) => void;
  errors: { [key: string]: any };
} => {
  const [errors, setErrors] = useState({});

  const validate = (data, onValid) => {
    return schema.validate(data, { abortEarly: false }).then(
      () => {
        setErrors({});
        onValid(data);
      },
      (err) => {
        setErrors(mapValidationErrors(err));
      },
    );
  };

  const getErrorMessagesByFieldName = (fieldNames: string | string[]) => {
    let errorKeys: string[] = [];

    if (Array.isArray(fieldNames)) {
      errorKeys = fieldNames
        .map((item) => getParentAndChildErrorKeys(errors, item))
        .flatMap((item) => item);
    } else {
      errorKeys = getParentAndChildErrorKeys(errors, fieldNames);
    }

    let formattedMessages: string[] = [];
    for (const field of errorKeys) {
      errors[field] && formattedMessages.push(errors[field]);
    }

    return formattedMessages.length > 0
      ? uniq(formattedMessages).join(', ')
      : undefined;
  };

  const clearErrors = (fieldKey: string | undefined): void => {
    if (!fieldKey) {
      setErrors({});
    } else {
      setErrors((prevErrors) =>
        deleteFieldAndChildrenErrors(prevErrors, fieldKey),
      );
    }
  };

  return { validate, getErrorMessagesByFieldName, clearErrors, errors };
};