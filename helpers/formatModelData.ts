import bcrypt from 'bcrypt';

const formatModelData = async <ModelType>(
  resource: string, 
  requestBody: Partial<ModelType>, 
  existingModel: ModelType) => {

    const acceptedFields = resource === 'customer' ?
    ['name', 'username', 'password', 'email', 'phone', 'avatar']
    : ['title', 'body', 'rating', 'recommend'];

    const updatedModelData: Partial<ModelType> = {};
    for (const field in requestBody) {
      const valueIsDifferent = requestBody[field] !== existingModel[field];
      if (acceptedFields.includes(field) && valueIsDifferent) {
        if (/^\s*$/.test(requestBody[field] as string)) {
          return { error: 'Field(s) cannot be empty or blank.'};
        }
        updatedModelData[field] = requestBody[field];
      }
      if (field === 'password' && resource === 'customer') {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash((requestBody as unknown as Customer).password, salt);
        (updatedModelData as Partial<Customer>).password = hashedPassword;
      }
      if (field === 'rating') {
        if (![0, 1, 2, 3, 4, 5].includes((requestBody as unknown as Review).rating)) {
          return { error: 'Rating must be a whole number between 0 and 5.'};
        }
      }
      if (field === 'username' && !/^[A-Za-z0-9_-]+$/.test(field)) {
        return { error: 'Username can only contain letters, numbers, dashes and underscores.' };
      }
    }
    return updatedModelData;
}

export default formatModelData;