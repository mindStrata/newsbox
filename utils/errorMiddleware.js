const errorMiddleware = (err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).send({
      error: {
        status: 400,
        message: "Validation Error",
        details: Object.values(err.errors).map((error) => error.message),
      },
    });
  }

  // Display field wise validation error through mongoose and error handler
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).send({
      error: {
        status: 400,
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } must be unique.`,
        details: `${field.charAt(0).toUpperCase() + field.slice(1)}: ${
          err.keyValue[field]
        } already exists.`,
      },
    });
  }
  // Handles the API errors
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};

export default errorMiddleware;
