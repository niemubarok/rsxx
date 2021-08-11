import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Doctor from 'App/Models/Doctor'

export default class DoctorSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Doctor.createMany([{
      kodeDokter: "D0001",
      namaDokter: "dr. Mansyur, Sp.A",
      kodePoli: "ana"
    },
    {
      kodeDokter: "D0002",
      namaDokter: "dr. Rizal, Sp.Og",
      kodePoli: "obg"
      },
    {
      kodeDokter: "D0003",
      namaDokter: "dr. Safei, Sp.Pd",
      kodePoli: "int"
    }])
  }
}
