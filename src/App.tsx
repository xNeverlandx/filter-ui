import React, {useState, useEffect} from 'react';
import './App.css';
import {FilterTable} from "./components/table/FilterTable";
import {FilterDto} from "./components/types";
import {AddFilterModal} from "./components/modal/AddFilterModal";
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import {addNewFilter, filtersLoaded, filtersSelector} from "./components/store/filterSlice";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const filters: FilterDto[] = useSelector(filtersSelector);
  const dispatch = useDispatch();
  const [isModalMode, setIsModalMode] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/filter/get-all')
      .then((res) => {
        dispatch(filtersLoaded(res.data));
      })
  }, []);

  const saveNewFilter = (filterDto: FilterDto) => {
    axios.post('http://localhost:8080/api/filter', filterDto)
      .then((res) => {
        dispatch(addNewFilter(res.data));
        alert('Saved!');
      });
  }

  return (
    <div>
      <h1>Filter Table</h1>
      <FilterTable
        data={filters}
      />

      <button onClick={() => setOpenModal(true)}>Add Filter</button>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isModalMode}
            onChange={() => setIsModalMode(!isModalMode)}
          />
          Modal Mode
        </label>
      </div>

      <AddFilterModal
        isOpen={openModal}
        onSave={(filter) => saveNewFilter(filter)}
        onClose={() => setOpenModal(false)}
        isModal={isModalMode}
      />
    </div>
  );
}

export default App;
