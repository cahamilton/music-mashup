/** @format */

const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

module.exports = {
  /**
   * Sanitize and process string content
   * @param {String} string
   * @returns {String}
   */
  sanitizeContent(string) {
    return DOMPurify.sanitize(string).replace(/(?:\r\n|\r|\n)/g, '<br>');
  },

  /**
   * Converts string to Title Case
   * @param string
   * @returns {String}
   */
  titleCase(string) {
    return string
      .toLowerCase()
      .replace(/(?:^|\s|-)\S/g, (match) => match.toUpperCase());
  },
};
