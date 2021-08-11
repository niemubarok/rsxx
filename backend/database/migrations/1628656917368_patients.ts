import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Patients extends BaseSchema {
  protected tableName = 'patients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table.integer('no_rekam_medis', 6).primary()
      table.bigInteger('no_ktp')
      table.string('nama_pasien')
      table.string('alamat')
      table.enum('jenis_bayar',['cash', 'asuransi', 'bpjs'])
      table.string('tgl_lahir')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
