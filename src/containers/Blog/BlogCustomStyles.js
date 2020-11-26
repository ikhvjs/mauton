export const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      border: 0,
      minHeight: '29px',
      height: '29px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided) => ({
      ...provided,
      height: '29px',
      padding: '0 6px'
    }),

    input: (provided) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '29px',
    }),
  };