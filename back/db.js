import { Sequelize, DataTypes } from 'sequelize';
import 'dotenv/config'; // このモジュールで.envから環境変数を設定する

async function dbInit(){
    const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.SQL,
    })

    const User = sequelize.define('User', {  // Userテーブル
        id: {
            type: DataTypes.INTEGER,  // 整数型
            autoIncrement: true,
            primaryKey: true
            },
        mail: {
            type: DataTypes.STRING,  // 文字列型
            allowNull: false         // Not Null
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    const Favorite = sequelize.define('Favorite', {  // Favoriteテーブル
        id: {
            type: DataTypes.INTEGER,  // 整数型
            autoIncrement: true,
            primaryKey: true
            },
        work_name: {
            type: DataTypes.STRING,  // 文字列型
            allowNull: false         // Not Null
        },
        url: {
            type: DataTypes.STRING,
        }
    })

    await User.sync()
    await Favorite.sync()
}

async function dbInsertUser(id,mail,password){
    const user = await User.create({id: id, mail: mail, password: password})
}

async function dbInsertFavorite(id,work_name,url){
    const favorite = await Favorite.create({id: id, work_name: work_name , url: url})
}

export {dbInit,dbInsertUser,dbInsertFavorite};