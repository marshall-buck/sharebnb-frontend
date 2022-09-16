import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ShareBnB {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ShareBnB.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }


  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get all properties with option to filter by description */
  static async getProperties(description) {
    let res = await this.request(`properties/`, {description});
    return res.properties;
  }

  /** Get a property by id */
  static async getProperty(id) {
    let res = await this.request(`properties/${id}`);
    return res.property;
  }
  /** Create property
   * formData- { title, address, description ,price }
   *
   * returns
   * -{id, title, address, description ,price, owner_username }
   *
   */

  static async createProperty(formData) {
    let res = await this.request("properties", formData, "post");
    return res.property;
  }

  /**  Handles post request with content-type  "multipart/form-data" */
  static async upload(endpoint, data, method = "post") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${ShareBnB.token}`,
      "Content-Type": "multipart/form-data"
    };

    // const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** formData
   * - {files, propertyId}
   * - returns  property:
   *    { id, title, address, description ,price, owner_username, images }
   *  where images is [{key, property_id}, ...]
   */

  static async uploadImages(formData) {
    let res = await this.upload(`properties/images`, formData);
    return res.property;
  }

  /** Send a msg */

  static async sendMessage(data) {
    let res = await this.request("messages", data, "post");
    return res.message;
  }

  /** Get messages from*/
  static async getMsgsSent(username) {
    let res = await this.request(`users/${username}/from`)
    return res.messages;
  }

  /** Get messages to */
  static async getMsgsReceived(username) {
    let res = await this.request(`users/${username}/to`)
    return res.messages;
  }

}

export default ShareBnB;
