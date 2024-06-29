// @ts-nocheck
import { MappedErrors } from './useYupValidation.types';

export const mapValidationErrors = (yupError): MappedErrors => {
  let errors = {};
  yupError.inner?.forEach((valErr, index) => {
    errors[valErr.path] = yupError.errors[index];
  });
  return errors;
};

export const getParentAndChildErrorKeys = (
  errors: MappedErrors,
  parentField: string,
): string[] => {
  return Object.keys(errors).filter(
    (key) =>
      key === parentField ||
      (key.includes('.') && key.split('.')[0] === parentField),
  );
};

export const deleteFieldAndChildrenErrors = (
  errors: MappedErrors,
  fieldName: string,
): MappedErrors => {
  let newErrors = { ...errors };

  const errorsToDelete = getParentAndChildErrorKeys(errors, fieldName);

  for (const errorKey of errorsToDelete) {
    delete newErrors[errorKey];
  }
  return newErrors;
};