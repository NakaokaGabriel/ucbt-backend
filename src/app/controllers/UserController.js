// Coisas para fazer Adicionar um update de usuario
// Conversar com o marcos sobre um delete de usuario

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
    console.log(req.userId);

    return res.json({ ok: true });
  }
}

export default new UserController();
