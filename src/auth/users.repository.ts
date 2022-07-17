import { EntityRepository, Repository } from 'typeorm';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authenticateDto: AuthenticateDto): Promise<User> {
    const { firstname, lastname, password, email } = authenticateDto;

    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(password, salt);

    const userObject = { firstname, lastname, password: hash, email };

    const user: User = this.create(userObject);

    return this.save(user);
  }
}
