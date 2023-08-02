export interface FaviconUpdaterConfig {
  /**
   * @example process.cwd() + '/public'
   */
  publicFolder: string;
  sanity: {
    clientConfig: {
      projectId: string;
      dataset: string;
      apiVersion: string;
      useCdn: boolean;
    };
    /**
     * @description
     * Sanity locales in priority order. First locale with a favicon wins.
     * If no locales, set to an empty array or simply don't set it.
     */
    locales?: string[];
    /**
     * @description
     * When config.sanity.locales are present, the query will run with each locale. The function takes each locale as an argument.
     * When config.sanity.locales are not present, the query will run just once. The function should just return the query as is.
     *
     * @example
     * With locales:
     * locale => `*[_type == "globalSeo"][0]["${locale}"]["favicon"]["asset"]->url`
     *
     * Without locales:
     * () => `*[_type == "globalSeo"][0]["favicon"]["asset"]->url`
     */
    faviconUrlQuery: (locale?: string) => string;
  };
}
