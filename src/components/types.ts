export interface FilterDto {
  filterId: number | null;
  name: string;
  criteriaDtoList: CriteriaDto[];
}

export interface CriteriaDto {
  criteriaId: number | null;
  type: CriteriaType;
  condition: ConditionType;
  criteriaValue: string;
  selected: boolean;
}

export type CriteriaType = 'Amount' | 'Title' | 'Date';
export type ConditionType = 'More' | 'Less' | 'Equal' | 'Starts with' | 'Contains' | 'Ends with' | 'From' | 'To';