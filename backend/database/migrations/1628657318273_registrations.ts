import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Registrations extends BaseSchema {
  protected tableName = 'registrations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('tgl_registrasi')
      table.integer('no_antrian')
      table.integer('no_rekam_medis', 6)
      table.string('kd_dokter')
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
