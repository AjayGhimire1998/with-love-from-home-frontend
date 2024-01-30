const API_URL = process.env.REACT_APP_API_URL;

export const customerSignUp = (
  fullName,
  email,
  password,
  passwordConfirmation
) => {
  fetch( API_URL + "/auth/customer/register", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      user: {
        fullname: fullName,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.accessToken) {
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(data.accessToken));
        localStorage.setItem("id", data.user.data.id);
        // window.location.reload();
      } else if (data?.error) {
        localStorage.clear();
        localStorage.setItem("signup_error", JSON.stringify(data.error));
        // window.location.reload();
      }
      return data;
    })
    .catch((error) => console.log("error", error));
};

export const customerLogin = (email, password) => {
  fetch(API_URL + "/auth/customer/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data?.accessToken) {
        localStorage.clear();

        localStorage.setItem("user", JSON.stringify(data.accessToken));
        localStorage.setItem("id", data.user.data.id);
        // window.location.reload();
      } else if (data?.error) {
        localStorage.clear();
        localStorage.setItem("login_error", JSON.stringify(data.error));
        // window.location.reload();
      }
      return data;
    })
    .catch((error) => console.log("error", error));
};

export const storeSignUp = (
  name,
  logo,
  categoryId,
  email,
  password,
  passwordConfirmation
) => {
  fetch(API_URL + "/auth/store/register", {
    method: "POST",
    headers: {
      "Content-Type": ["application/json", "multipart/form-data"],
      Accept: "application/json",
    },
    body: JSON.stringify({
      store: {
        name: name,
        logo: logo,
        category_id: categoryId,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.accessToken) {
        localStorage.clear();
        localStorage.setItem("store", JSON.stringify(data.accessToken));
        localStorage.setItem("id", data.store.data.id);
        // window.location.reload();
      } else if (data?.error) {
        localStorage.clear();
        localStorage.setItem("store_signup_error", JSON.stringify(data.error));
        // window.location.reload();
      }
      return data;
    })
    .catch((error) => console.log("error", error));
};

export const storeLogin = (email, password) => {
  fetch(API_URL + "/auth/store/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data?.accessToken) {
        localStorage.clear();
        localStorage.setItem("store", JSON.stringify(data.accessToken));
        localStorage.setItem("id", data.store.data.id);
        // window.location.reload();
      } else if (data?.error) {
        localStorage.clear();
        localStorage.setItem("store_login_error", JSON.stringify(data.error));
        // window.location.reload();
      }
      return data;
    })
    .catch((error) => console.log("error", error));
};

export const logOut = () => {
  localStorage.clear();
  window.location.reload();
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const getCurrentStore = () => {
  return JSON.parse(localStorage.getItem("store"));
};

