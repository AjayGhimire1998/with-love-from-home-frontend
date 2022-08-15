export const authHeader = (userToken) => {
  if (userToken) {
    return { Authorization: "Bearer " + userToken };
  } else {
    return {};
  }
};
