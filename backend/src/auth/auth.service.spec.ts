import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { UserRole } from '../users/user.entity';
describe('AuthService', () => {
  it('rejects an invalid password', async () => {
    const users = {
      findByEmailWithPassword: jest.fn().mockResolvedValue({
        id: 1,
        email: 'user@example.com',
        role: UserRole.VISITOR,
        passwordHash: await bcrypt.hash('correct-password', 4),
      }),
    } as any;
    const service = new AuthService(
      users,
      new JwtService({ secret: 'test-secret' }),
    );
    await expect(
      service.login('user@example.com', 'wrong-password'),
    ).rejects.toThrow('Invalid email or password');
  });
  it('signs the user id as sub', async () => {
    const user = {
      id: 7,
      email: 'user@example.com',
      role: UserRole.VISITOR,
      passwordHash: await bcrypt.hash('correct-password', 4),
    };
    const users = {
      findByEmailWithPassword: jest.fn().mockResolvedValue(user),
    } as any;
    const jwt = new JwtService({ secret: 'test-secret' });
    const result = await new AuthService(users, jwt).login(
      user.email,
      'correct-password',
    );
    expect(jwt.verify(result.token).sub).toBe(7);
  });
});
