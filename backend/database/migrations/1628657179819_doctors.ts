import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Doctors extends BaseSchema {
  protected tableName = 'doctors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table.string('kd_dokter').primary()
      table.string('nama_dokter')
      table.string('kd_poli')
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
