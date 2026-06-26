import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto) {
    const senhaCriptografada = await bcrypt.hash(data.senha, 10);

    return this.userModel.create({
      ...data,
      senha: senhaCriptografada,
    });
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async login(data: LoginDto) {
    const user = await this.userModel.findOne({
      where: {
        matricula: data.matricula,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(data.senha, user.senha);

    if (!senhaCorreta) {
      throw new Error('Senha inválida');
    }

    const token = this.jwtService.sign({
      id: user.id,
      matricula: user.matricula,
    });

    return {
      token,
      usuario: {
        id: user.id,
        nome: user.nome,
        matricula: user.matricula,
      },
    };
  }
}
