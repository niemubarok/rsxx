import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clinics extends BaseSchema {
  protected tableName = 'clinics'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table.string('kd_poli').primary()
      table.string('nama_poli')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.collate('latin1_swedish_ci')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
