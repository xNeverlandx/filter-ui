// @ts-nocheck
import * as yup from 'yup';
import {FilterDto} from "../types";

export const modalSchema: yup.SchemaOf<FilterDto> = yup.object({
  criteriaDtoList: yup.array().of(yup.object()).required("Filter should contain at least one criteria"),
});