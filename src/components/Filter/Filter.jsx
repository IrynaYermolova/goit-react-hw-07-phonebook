import { useDispatch } from 'react-redux';
import css from './filter.module.css';
import { filterContact } from '../../redux/filter/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const changeFiltr = event => {
    dispatch(filterContact(event.target.value));
  };

  return (
    <label>
      <h3 className={css.filterTitle}>Find contacts by name</h3>
      <input
        type="text"
        name="filter"
        onChange={changeFiltr}
        className={css.input}
      />
    </label>
  );
};

export default Filter;
