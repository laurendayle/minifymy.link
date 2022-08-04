
const parseJWT = async (token) => {
  console.log('entered parseJWT');
  try {
    const parsedToken = await JSON.parse(atob(token.split(".")[1]));
    console.log('parsedToken', parsedToken);
    return parsedToken;
  } catch (err) {
    console.log(err, 'err');
    return err;
  }
}

module.exports = { parseJWT };