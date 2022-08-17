
const parseJWT = async (token) => {
  console.log(token, 'token from parseJWT');
  try {
    const parsedToken = await JSON.parse(atob(token.split(".")[1]));
    return parsedToken;
  } catch (err) {
    console.log(err, 'err');
    return err;
  }
}

module.exports = { parseJWT };