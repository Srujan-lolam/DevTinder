const authAdmin = (req, res) => {
  console.log("checking if he the admin");
  const isAUthorized = true;
  if (!isAUthorized) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

const authUser = (req, res) => {
  console.log("checking if he the admin");
  const isAUthorized = true;
  if (!isAUthorized) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};
module.exports = {
  authAdmin,
  authUser,
};
