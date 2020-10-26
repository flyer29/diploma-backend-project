const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
    });
    res
      .status(200)
      .send({ status: '200', message: 'logout' });
  } catch (err) {
    return next();
  }
};

module.exports = logout;
