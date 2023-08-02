import { useState } from 'react';

const useForm = (formStates = {}) => {
  const [data, setData] = useState(formStates);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return { data, handleChange, setData };
};

export default useForm;
