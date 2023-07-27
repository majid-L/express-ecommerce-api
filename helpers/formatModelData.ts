import bcrypt from 'bcrypt';

const formatModelData = async <ModelType>(
  resource: string, 
  requestBody: Partial<ModelType>, 
  existingModel: ModelType) => {

    const acceptedFields = resource === 'customer' ?
    ['name', 'username', 'password', 'email', 'billingAddress', 'shippingAddress', 'avatar']
    : ['title', 'body', 'rating', 'recommend'];

    const updatedModelData: Partial<ModelType> = {};
    for (const field in requestBody) {
      const valueIsDifferent = requestBody[field] !== existingModel[field];
      if (acceptedFields.includes(field) && valueIsDifferent) {
        if (/^\s*$/.test(requestBody[field] as string)) {
          return null;
        }
        updatedModelData[field] = requestBody[field];
      }
      if (field === 'password') {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash((requestBody as unknown as Customer).password, salt);
        (updatedModelData as Partial<Customer>).password = hashedPassword;
      }
    }
    return updatedModelData;
}

export default formatModelData;