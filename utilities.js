module.exports = {

  /**
   * Converts newlines to line breaks
   * @param string
   * @returns {String}
   */
  nl2br(string) {
    return string.replace(/(?:\r\n|\r|\n)/g, '<br>');
  },

  /**
   * Converts string to Title Case
   * @param string
   * @returns {String}
   */
  titleCase(string) {
    return string.toLowerCase().replace(/(?:^|\s|-)\S/g, match => match.toUpperCase());
  },

};
