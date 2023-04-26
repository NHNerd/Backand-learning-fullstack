import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

export async function login(req, res) {
  try {
    // Search input email in Data Base
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'User is not founded. :(',
      });
    }

    // compare input password and password in Data  Base
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Wrong Login or Password. :(',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret1234',
      {
        expiresIn: '30d',
      }
    );

    // Exclude passwordHash from user object(for response)
    const { passwordHash: excludedField, ...userData } = user._doc;

    res.status(200).json({
      message: 'Login is success :)',
      user: userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Bad try to authorithation. :(',
    });
  }
}

export async function register(req, res) {
  try {
    // Validation of already existing email
    const existingEmail = await UserModel.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(409).json({
        message: 'Email already exists. :(',
      });
    }

    // Validation of already existing name
    const existingName = await UserModel.findOne({ name: req.body.name });
    if (existingName) {
      return res.status(409).json({
        message: 'Name already exists. :(',
      });
    }

    // Heshing password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Creat new user
    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    // Save new user
    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret1234',
      {
        expiresIn: '30d',
      }
    );

    // Exclude passwordHash from user object(for response)
    const { passwordHash: excludedField, ...userData } = user._doc;

    res.status(201).json({
      message: 'User success created. :)',
      user: userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Bad try to registration. :(',
    });
  }
}

export async function me(req, res) {
  try {
    const user = await UserModel.findById(req.userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({
        message: 'User undefind. :(',
      });
    }

    const { passwordHash: excludedField, ...userData } = user._doc;

    res.status(200).json({
      message: 'Token is decoded. :)',
      user: userData,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'No access. :(',
    });
  }
}
