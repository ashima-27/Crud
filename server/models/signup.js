"use strict";
const {Model, DataTypes} =require("sequelize");
// const { sequelize } = require(".");

module.exports = (sequelize,DataTypes)=>{
    class Signup extends Model{
        static associate(models){
           Signup.hasMany(models.Crud,{
               foreignKey:'userId' ,
               onDelete: "CASCADE",
               onUpdate: "CASCADE"
           });
          
        }
    }

    Signup.init({
        userId:{
            primaryKey:true,
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
           
        },
        emailId:{
        
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          confirmPassword:{
            type: DataTypes.STRING,
            allowNull: false,
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
          }
    },{
        sequelize,
        modelName:'Signup'
    })
    return Signup
}