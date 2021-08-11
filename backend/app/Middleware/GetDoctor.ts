import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doctor from 'App/Models/Doctor'

export default class GetDoctor {
  public async handle ({request, response}: HttpContextContract, next: () => Promise<void>) {
    const { kodeDokter,namaDokter,
        kodePoli } = request.body()
    try {
      const doctor = await Doctor.query()
        .where('kd_dokter', kodeDokter)
        .orWhere((query) => {
          query.where('nama_dokter', 'like', `%${namaDokter}%`).where('kd_poli', kodePoli)
        })
        .first()

      if (!doctor?.$isPersisted) {
        response.status(404).json({
          message: 'dokter tidak ditemukan',
        })
      } else {
        request.updateBody(doctor)
        await next()
      }
    } catch (error) {
      response.json({
        message: error,
      })
    }
  }
}
