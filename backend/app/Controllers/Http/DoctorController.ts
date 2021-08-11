import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Doctor from 'App/Models/Doctor';

export default class DoctorController {
 public async index({ response }: HttpContextContract) {
    const doctor = await Doctor.query().preload('clinic');
    response.status(200).json({
      doctor,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const doctor = await Database.rawQuery(
      "select MAX(kd_dokter) as last_kd_dokter from doctors"
    );

    const lastKodeDokter: any = Object.values(await doctor[0][0])[0];

    const nextKodeDokter = lastKodeDokter + 1;

    // return request.body().namaPasien

    try {
      const dataToStore = {
        kodeDokter: nextKodeDokter,
        namaDokter: request.body().namaDokter,
        kodePoli: request.body().kodePoli
      };

      const store = Doctor.create(dataToStore);

      if ((await store).$isPersisted) {
        response.status(201).json({
          message: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async show({request, response }: HttpContextContract) {
    const { kodeDokter } = request.body();
    
    const doctor = await Doctor.findBy('kodeDokter', kodeDokter)
    response.status(200).json({
      data:doctor
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const { kodeDokter } = request.body();
    const { namaDokter,
        kodePoli } =
      request.original();

    const doctor = await Doctor.findBy('kodeDokter', kodeDokter)
    doctor
      ?.merge({
        kodeDokter,
        namaDokter,
        kodePoli
      })
      .save();

    if (doctor?.$isPersisted) {
      response.status(201).json({
        message: "data terupdate",
      });
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { kodeDokter } = request.body();
    const doctor = await Doctor.findBy('kodeDokter', kodeDokter)
    doctor?.delete();

    if (doctor?.$isPersisted) {
      response.status(201).json({
        message: "data terhapus",
      });
    }
  }
}
