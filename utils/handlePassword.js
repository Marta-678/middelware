const bcryptjs = require("bcryptjs");

const encrypt = async (clearPassword) => {
  const hash = await bcryptjs.hash(clearPassword, 10);
  return hash;
};

const compare = async (clearPassword, hashedPassword) => {
  return await bcryptjs.compare(clearPassword, hashedPassword);
};

module.exports = { encrypt, compare };