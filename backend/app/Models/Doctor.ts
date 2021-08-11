import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Clinic from "./Clinic";

export default class Doctor extends BaseModel {
  @belongsTo(() => Clinic, {
    foreignKey: "kodePoli",
  })
  public clinic: BelongsTo<typeof Clinic>;

  @column({ columnName: "kd_dokter", isPrimary: true })
  public kodeDokter: string;

  @column({ columnName: "nama_dokter" })
  public namaDokter: string;

  @column({ columnName: "kd_poli" })
  public kodePoli: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
