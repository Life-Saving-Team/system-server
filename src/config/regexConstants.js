const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
const passwordRegex  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
const nameRegex = /(.*[a-z]){3}/i;

module.exports = {emailRegex, passwordRegex, nameRegex}