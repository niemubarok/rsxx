import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Registration from "App/Models/Registration";

export default class GetRegistration {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    const { kodeDokter, kodePoli, tglRegistrasi, noRm } = request.body();

    console.log(request.body());

    const registration = await Registration.query()
      .where("kd_dokter", kodeDokter)
      .where("kd_poli", kodePoli)
      .where("no_rekam_medis", noRm)
      .where("tgl_registrasi", tglRegistrasi)
      .first();

    console.log(registration?.$isPersisted);

    if (registration?.$isPersisted) {
      response.status(404).json({
        message: "Pasien sudah terdaftar",
        isRegistered: true,
        data: registration,
      });
      console.log("sudah terdaftar");
    } else {
      console.log("next");
      await next();
    }
    // request.updateBody(registration)
  }
}
