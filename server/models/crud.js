"use strict";
const { Model } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    class Crud extends Model {
     static associate(models){
       Crud.belongsTo(models.Signup,{
        foreignKey:"userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
       })
     }
    }
    
    Crud.init({
        id : {
            allowNull : false,
            primaryKey : true,
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV4,
        },
      userId:{
        type:DataTypes.UUID,
        allowNull:false,
      },
      movie_name: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
       
      review:{
            type:DataTypes.STRING,
            allowNull: false,
           
      },
    
    }, {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'Crud' // We need to choose the model name
    });
    
    return Crud;
    }