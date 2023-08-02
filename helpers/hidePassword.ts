const hidePassword = ({ password, ...obj }: User) => {
  return {
    ...obj, 
    password: '**********'
  };
}

export default hidePassword;