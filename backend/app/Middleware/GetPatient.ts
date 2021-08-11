import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Patient from 'App/Models/Patient'

export default class GetPatient {
  public async handle ({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    
    const { noKtp, namaPasien, tglLahir } = request.body()
    console.log(noKtp);
    try {
      const pasien = await Patient.query()
      .where('no_ktp', noKtp)
      .orWhere((query) => {
        query.where('nama_pasien', 'like', `%${namaPasien}%`).where('tgl_lahir', tglLahir)
      })
      .first()
      
      if (!pasien?.$isPersisted) {
        response.status(404).json({
          message: 'pasien tidak ditemukan',
          isPasienBaru: true,
        })
      } else {
        request.updateBody(pasien)
        await next()
      }
    } catch (error) {
      response.json({
        message: error,
      })
    }
    // await next()
  }
}
