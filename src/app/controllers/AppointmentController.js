import { User, Appointment } from "../models";

class AppointmentController {
  async create(req, res) {
    //a informação do provider vem do dashboard.njk
    const provider = await User.findByPk(req.params.provider);

    return res.render("appointments/create", { provider });
  }
  async store(req, res) {
    const { id } = req.session.user;
    const { provider } = req.params;
    const { date } = req.body;
    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    });

    return res.redirect("/app/dashboard");
  }
}

export default new AppointmentController();
