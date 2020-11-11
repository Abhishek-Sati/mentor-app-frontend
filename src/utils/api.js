const DOMAIN = "http://localhost:5000/api/v1";

export default Object.freeze({
  home: {
    base: `${DOMAIN}/users`,
    mentors: `${DOMAIN}/users/all`,
  },
  detail: {
    base: `${DOMAIN}/tasks`,
  },
});
