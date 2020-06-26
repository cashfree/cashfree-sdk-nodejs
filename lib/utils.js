const checkKeysInObject = (obj = {}, keys = []) =>
  keys.every((key) => obj.hasOwnProperty(key));

module.exports = { checkKeysInObject };
