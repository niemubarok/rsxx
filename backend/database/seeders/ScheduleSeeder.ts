import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Schedule from 'App/Models/Schedule'

export default class ScheduleSeederSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Schedule.createMany([{
      id:20001,
      kodeDokter:"D0001",
      kodePoli:"ana",
      hariPraktek:"senin",
      isPraktek:"ya",
    },
    {
      id:20002,
      kodeDokter:"D0002",
      kodePoli:"obg",
      hariPraktek:"senin",
      isPraktek:"ya",
      },
    {
      id:20003,
      kodeDokter:"D0003",
      kodePoli:"int",
      hariPraktek:"senin",
      isPraktek:"tidak",
      },
    {
      id:20004,
      kodeDokter:"D0001",
      kodePoli:"ana",
      hariPraktek:"selasa",
      isPraktek:"ya",
      },
    {
      id:20005,
      kodeDokter:"D0001",
      kodePoli:"ana",
      hariPraktek:"rabu",
      isPraktek:"ya",
    }])
  }
}
