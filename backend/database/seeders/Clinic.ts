import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Clinic from 'App/Models/Clinic'

export default class ClinicSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Clinic.createMany([{
      kodePoli: "ana",
      namaPoli:"Poli Anak"
    },
    {
      kodePoli: "obg",
      namaPoli:"Poli Kandungan"
      },
    {
      kodePoli: "int",
      namaPoli:"Poli Internis"
   }])
  }
}
