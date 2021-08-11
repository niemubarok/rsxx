import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Schedules extends BaseSchema {
  protected tableName = 'schedules'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('kd_dokter')
      table.string('kd_poli')
      table.enum('hari_praktek', ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'])
      table.enum('isPraktek', ['ya', 'tidak'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      // table.charset('latin1')
      table.collate('latin1_swedish_ci')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
