const countRequests = (requests, userId) => {
  return requests.filter((request) => request.receiverId === userId).length;
};

const userById = (users, userId) => {
  return users.find((user) => user.id === userId);
};

function checkNotValidEmail(inputData_email) {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  let messageError = "";
  if (inputData_email.trim().length === 0) {
    messageError = `Введите ваш email`;
  } else if (inputData_email.trim().length < 6) {
    messageError = `Поле содержит меньше 6-х символов `;
  } else if (!pattern.test(inputData_email.trim())) {
    messageError = `Некорректный email`;
  }
  return messageError;
}

function checkNotValidInput(inputData) {
  let messageError = "";
  if (inputData.trim().length === 0) {
    messageError = `Введите данные`;
  } else if (inputData.trim().length < 6) {
    messageError = `Поле содержит меньше 6-х символов `;
  }
  return messageError;
}

export { countRequests, userById, checkNotValidEmail, checkNotValidInput };
