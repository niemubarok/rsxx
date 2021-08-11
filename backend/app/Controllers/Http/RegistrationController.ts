import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Registration from "App/Models/Registration";

export default class RegistrationController {
  public async index({ response }: HttpContextContract) {
    const registration = await Registration.query()
      .preload("patient")
      .preload("clinic")
      .preload("doctor");
    response.status(200).json({
      registration,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const { kodeDokter, kodePoli, tglRegistrasi, noRm } = request.body();
    const registration = await Database.rawQuery(
      "select MAX(no_antrian) as last_no_antrian from registrations where kd_dokter = :kodeDokter and kd_poli = :kodePoli and tgl_registrasi = :tglRegistrasi",
      {
        kodeDokter,
        kodePoli,
        tglRegistrasi,
      }
    );

    const lastNoAntrian: any = Object.values(await registration[0][0])[0];

    const nextNoAntrian = lastNoAntrian + 1;
    try {
      const dataToStore = {
        tglRegistrasi,
        noAntrian: nextNoAntrian,
        noRM: noRm,
        kodeDokter,
        kodePoli,
      };

      const store = Registration.create(dataToStore);
      console.log(store);

      if ((await store).$isPersisted) {
        response.status(201).json({
          message: "pasien berhasil terdaftar",
          data: dataToStore,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { kodeDokter } = request.body();

    const registration = await Registration.findBy("kodeDokter", kodeDokter);
    response.status(200).json({
      data: registration,
    });
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const { kodeDokter } = request.body();
    const { namaDokter, kodePoli } = request.original();

    const registration = await Registration.findBy("kodeDokter", kodeDokter);
    registration
      ?.merge({
        kodeDokter,
        namaDokter,
        kodePoli,
      })
      .save();

    if (registration?.$isPersisted) {
      response.status(201).json({
        message: "data terupdate",
      });
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { kodeDokter } = request.body();
    const registration = await Registration.findBy("kodeDokter", kodeDokter);
    registration?.delete();

    if (registration?.$isPersisted) {
      response.status(201).json({
        message: "data terhapus",
      });
    }
  }
}
