import $ from './Form.module.css';
import Button from '../Button/Button';

const Form = ({ children, onSubmit, legend, submitBtnText }) => (
  <form onSubmit={onSubmit}>
    <legend>{legend}</legend>
    <fieldset>
      {children.map((child) => {
        return <div className={$['form-row']}>{child}</div>;
      })}
      <Button type="submit">{submitBtnText}</Button>
    </fieldset>
  </form>
);

export default Form;
