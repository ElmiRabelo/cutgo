import { User } from "../models";

//resposavel pela autenticação do user
class SessionController {
  async create(req, res) {
    return res.render("auth/signin");
  }

  async store(req, res) {
    const { email, password } = req.body;

    //verifica se existe algum user com o email passado
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("Usuário não encontrado!");
      return res.redirect("/");
    }

    //verifica se o password informado não coincide com o db
    if (!(await user.checkPassword(password))) {
      console.log("Senha não coincide");
      return res.redirect("/");
    }

    req.session.user = user;

    return res.redirect("/app/dashboard");
  }
}

export default new SessionController();
