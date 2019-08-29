const config = {
  development: {
    apiUrl: "http://localhost:8000"
  },
  test: {
    apiUrl: "https://stark-meadow-98804.herokuapp.com"
  },
  production: {
    apiUrl: "https://stark-meadow-98804.herokuapp.com"
  }
};

export default config[process.env.REACT_APP_ENV || "development"];
