import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Patient from "./Patient";
import Clinic from "./Clinic";
import Doctor from "./Doctor";

export default class Registration extends BaseModel {
  @belongsTo(() => Patient, {
    foreignKey: "noRM",
  })
  public patient: BelongsTo<typeof Patient>;

  @belongsTo(() => Clinic, {
    foreignKey: "kodePoli",
  })
  public clinic: BelongsTo<typeof Clinic>;

  @belongsTo(() => Doctor, {
    foreignKey: "kodeDokter",
  })
  public doctor: BelongsTo<typeof Doctor>;

  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: "tgl_registrasi" })
  public tglRegistrasi: string;

  @column({ columnName: "no_antrian" })
  public noAntrian: number;

  @column({ columnName: "no_rekam_medis" })
  public noRM: number;

  @column({ columnName: "kd_dokter" })
  public kodeDokter: string;

  @column({ columnName: "kd_poli" })
  public kodePoli: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
