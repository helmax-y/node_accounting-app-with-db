import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();

app.use(express.json());

const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

app.get('/users', async(req, res) => {
  const users = await User.findAll();

  res.send(users);
});

app.post('/users', async(req, res) => {
  const user = await User.create({ name: req.body.name });

  res.statusCode = 201;
  res.send(user);
});

app.listen(3000);
