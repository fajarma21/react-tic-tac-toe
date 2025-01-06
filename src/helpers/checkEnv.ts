const checkEnv = () => {
  try {
    // ws url
    if (typeof import.meta.env.VITE_WS_URL !== "string") {
      throw new Error("Please check the .env file! Valid ws url is required!");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default checkEnv;
