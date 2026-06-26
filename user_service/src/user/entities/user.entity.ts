import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'usuarios',
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  cpf!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  telefone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  matricula!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  senha!: string;
}
