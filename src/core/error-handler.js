const getAxiosErrorObject = error => {
  const errObj = JSON.parse(JSON.stringify(error));
  return errObj;
};

async function handleApiError(error) {
  const errResponse = getAxiosErrorObject(error);
  return errResponse;
}

export { handleApiError };
