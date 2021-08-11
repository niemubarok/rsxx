import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Registration from "./Registration";

export default class Patient extends BaseModel {
  @hasMany(() => Registration, {
    foreignKey: "noRm",
  })
  public registration: HasMany<typeof Registration>;

  @column({ columnName: "no_rekam_medis", isPrimary: true })
  public noRm: number;

  @column({ columnName: "no_ktp" })
  public noKtp: number;

  @column({ columnName: "nama_pasien" })
  public namaPasien: string;

  @column({ columnName: "alamat" })
  public alamat: string;

  @column({ columnName: "jenis_bayar" })
  public jenisBayar: string;

  @column({ columnName: "tgl_lahir" })
  public tglLahir: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
