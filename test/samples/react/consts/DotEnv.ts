export default class DotEnv {
  public static webApi = () => ({
    baseUrl: process.env.REACT_APP_API_URL as string,
    defaultVersion: process.env.REACT_APP_API_DEFAULT_VERSION as string,
  });

  public static environment = () => ({
    environment: process.env.NODE_ENV,
  });
}
