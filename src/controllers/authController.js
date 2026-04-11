export const registerController = (req, res) => {
  res.status(201).json({
    message: 'User registered',
  });
};

export const loginController = (req, res) => {
  res.status(200).json({
    message: 'User logged in',
  });
};
