import css from './form.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/contactSelectors';

const Form = () => {
  const contacts = useSelector(selectContacts);
  console.log(contacts);
  const dispatch = useDispatch();

  const onSubmit = event => {
    event.preventDefault();
    const { name, number } = event.target.elements;
    const form = event.currentTarget;
    const filteredName = contacts.filter(contact =>
      contact.name.includes(name.value)
    );
    if (filteredName.length > 0) {
      alert(`${filteredName[0].name} is already in contacts.`);
      form.reset();
      return;
    }
    const contact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };
    dispatch(addContact(contact));
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <label className={css.label}>
        <span className={css.span}>Name</span>
        <input
          className={css.input}
          type="text"
          name="name"
         
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          
        />
      </label>
      <label className={css.label}>
        <span className={css.span}>Number</span>
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Form;

