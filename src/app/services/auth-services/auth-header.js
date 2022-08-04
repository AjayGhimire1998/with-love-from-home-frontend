export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(localStorage.getItem("store"))

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
};
