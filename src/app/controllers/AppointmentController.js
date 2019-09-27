import { User } from "../models";

class AppointmentController {
  async create(req, res) {
    //a informação do provider vem do dashboard.njk
    const provider = await User.findByPk(req.params.provider);

    return res.render("appointments/create", { provider });
  }
}

export default new AppointmentController();
