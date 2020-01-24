export const successResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    statusCode,
    message,
    data
  });
};

export const errorResponse = (res, status, message, error) => {
  return res.status(status).json({
    status,
    message,
    error
  });
};
