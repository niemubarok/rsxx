import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Clinic from 'App/Models/Clinic';

export default class ClinicController {
 public async index({ response }: HttpContextContract) {
    const clinic = await Clinic.all();
    response.status(200).json({
      clinic,
    });
  }

}
