import React from 'react';

import {FilterDto} from "../types";
import './Table.css';

interface FilterTableProps {
  data: FilterDto[];
}

export const FilterTable = (props: FilterTableProps) => {


  return (
    <table className="table">
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Criteria count</th>
      </tr>
      </thead>
      <tbody>
      {props.data.map((row) => (
        <tr key={row.filterId}>
          <td>{row.filterId}</td>
          <td>{row.name}</td>
          <td>{row.criteriaDtoList.length}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}