module.exports = {
  style: {
    postcss: {
      plugins: [
        require('postcss-nested'),
        require('postcss-simple-vars')
      ],
    }
  }
};
