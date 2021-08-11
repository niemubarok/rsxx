import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Patient from 'App/Models/Patient'

export default class PatientSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Patient.createMany([{
      noRm: 100001,
      noKtp: 1234567891234567,
      namaPasien: "Husni Mubarok",
      alamat: "Ciputat",
      jenisBayar: "cash",
      tglLahir: "1992-09-20",
    },
    {
      noRm: 100002,
      noKtp: 1234567891234568,
      namaPasien: "Reza",
      alamat: "jagakarsa",
      jenisBayar: "asuransi",
      tglLahir: "1990-09-20",
    },])
  }
}
