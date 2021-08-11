import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName:'kd_dokter' })
  public kodeDokter: string

  @column({ columnName:'kd_poli' })
  public kodePoli: string

  @column({ columnName:'hari_praktek' })
  public hariPraktek: string

  @column({ columnName:'isPraktek' })
  public isPraktek: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
