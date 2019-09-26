import { User } from "../models";

class DashboardController {
  async index(req, res) {
    const providers = await User.findAll({ where: { provider: true } });

    return res.render("dashboard", { providers });
  }
}

export default new DashboardController();
