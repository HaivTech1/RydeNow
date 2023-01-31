export const updateNotification = (updater, text, type = 'error') => {
  updater({text, type});
  setTimeout(() => {
    updater({text: '', type: ''});
  }, 2500);
};

export const sendError = error => {
  if (error?.response?.data) {
    console.log(error);
    return error.response.data;
  }
  return {success: false, error: error.message};
};
