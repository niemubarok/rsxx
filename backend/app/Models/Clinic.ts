import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Doctor from "./Doctor";

export default class Clinic extends BaseModel {
  @hasMany(() => Doctor, {
    foreignKey: "kodePoli",
  })
  public doctor: HasMany<typeof Doctor>;

  @column({ columnName: "kd_poli", isPrimary: true })
  public kodePoli: String;

  @column({ columnName: "nama_poli" })
  public namaPoli: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
