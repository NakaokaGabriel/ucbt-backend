// Ver qual a edição de email se deve mudar ao pedir o email e confirmar no mesmo
// Ou mudar ao confirmar a senha ou algo do tipo

import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      money: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;

    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail) {
      return res.status(400).json({ error: 'Email already exist' });
    }

    const { originalname: avatar_name, filename: avatar_path } = req.file;
    const { name, password, money } = req.body;

    await User.create({
      avatar_name,
      avatar_path,
      name,
      email,
      password,
      money,
    });

    return res.json({
      name,
      email,
      money,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const user = await User.findByPk(req.userId);

    const { email, oldPassword } = req.body;

    if (email) {
      if (user.email !== email) {
        const userExist = await User.findOne({ where: { email } });

        if (userExist) {
          return res.status(400).json({ error: 'Email already exist' });
        }
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, password } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      password,
    });
  }
}

export default new UserController();
