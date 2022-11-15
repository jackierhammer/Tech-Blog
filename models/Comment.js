// this is where the comment model will go

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// creates Comment model
class Comment extends Model {}

// comment only needs a body; the important relationships will be established with foreign keys
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

// exports Comment model
module.exports = Comment;