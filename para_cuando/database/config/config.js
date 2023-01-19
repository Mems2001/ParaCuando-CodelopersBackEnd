"use strict";
require('dotenv').config();
module.exports =
{
    development: {
      nodeEnv: process.env.NODE_ENV,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: "postgres" ,
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
    },
    dialectOptions: {
      useUTC: true,
    },
    timezone: 'UTC'
    } ,
    test: { 
      nodeEnv: process.env.NODE_ENV,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: "postgres" ,
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
    },
    dialectOptions: {
        useUTC: true,
    },
      timezone:'UTC'
  },
  production: {
      nodeEnv: process.env.NODE_ENV,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: "postgres" ,
      dialectOptions: {
          ssl: {
              require: true,
              rejectUnauthorized: false,
          },
          useUTC: true,
      },
      define: {
          timestamps: true,
          underscored: true,
          underscoredAll: true,
          createdAt:'created_at',
          updatedAt:'updated_at',
          deletedAt:'deleted_at',
      },
      timezone:'UTC'
  }
  }