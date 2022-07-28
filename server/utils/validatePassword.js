
exports.validatePassword = (userObj) => {
  const { password, verifyPassword } = userObj;
  return password === verifyPassword;
}