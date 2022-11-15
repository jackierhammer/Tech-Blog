// this is where the post model will go

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// creates Post model
class Post extends Model {}

// posts only need a title and body
// the connection to the user will be a foreign key relationship
Post.init(
  {
    // both title and body are required elements
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // changed to content to clear confusion
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize
  }
);

// exports Post model
module.exports = Post;