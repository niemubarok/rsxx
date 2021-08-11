import { Response } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Patient from "App/Models/Patient";

export default class PatientController {
  public async index({ response }: HttpContextContract) {
    const pasien = await Patient.all();
    response.status(200).json({
      pasien,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const { noKtp, namaPasien, tglLahir } = request.body();
    try {
      const pasien = await Patient.query()
        .where("no_ktp", noKtp)
        .orWhere((query) => {
          query
            .where("nama_pasien", "like", `%${namaPasien}%`)
            .where("tgl_lahir", tglLahir);
        })
        .first();

      if (pasien?.$isPersisted) {
        response.status(404).json({
          message: "pasien sudah terdaftar",
        });
      } else {
        const pasien = await Database.rawQuery(
          "select MAX(no_rekam_medis) as last_rm from patients"
        );

        const lastRM: any = Object.values(await pasien[0][0])[0];

        const nextRM = lastRM + 1;

        // return request.body().namaPasien

        try {
          const dataToStore = {
            noRm: nextRM,
            noKtp: request.body().noKtp,
            namaPasien: request.body().namaPasien,
            alamat: request.body().alamat,
            jenisBayar: request.body().jenisBayar,
            tglLahir: request.body().tglLahir,
          };

          const store = Patient.create(dataToStore);

          if ((await store).$isPersisted) {
            response.status(201).json({
              message: "success",
              data: dataToStore,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      response.json({
        message: error,
      });
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { noRm } = request.body();

    const pasien = await Patient.findBy("noRm", noRm);
    response.status(200).json({
      data: pasien,
    });
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const { noRm } = request.body();
    const { noKtp, namaPasien, alamat, jenisBayar, tglLahir } =
      request.original();

    const pasien = await Patient.findBy("noRm", noRm);
    pasien
      ?.merge({
        namaPasien: namaPasien,
        noKtp: noKtp,
        alamat: alamat,
        jenisBayar: jenisBayar,
        tglLahir: tglLahir,
      })
      .save();

    if (pasien?.$isPersisted) {
      response.status(201).json({
        message: "data terupdate",
      });
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { noRm } = request.body();
    const pasien = await Patient.findBy("noRm", noRm);
    pasien?.delete();

    if (pasien?.$isPersisted) {
      response.status(201).json({
        message: "data terhapus",
      });
    }
  }
}
