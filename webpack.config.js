const path = require("path");

//entry

//output

//mode





module.exports = {entry: './public/js/index.js',
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  mode: 'development'
};