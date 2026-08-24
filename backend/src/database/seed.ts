import * as bcrypt from 'bcryptjs';
import dataSource from './data-source';
import { User, UserRole } from '../users/user.entity';
import {
  AgriculturalProduct,
  Craft,
  Farm,
  Promotion,
  Tour,
} from '../catalog/catalog.entities';

async function seed() {
  await dataSource.initialize();
  const users = dataSource.getRepository(User);
  const rows = [
    ['Farmer', 'Demo', 'farmer@example.com', UserRole.FARMER],
    ['Artisan', 'Demo', 'artisan@example.com', UserRole.ARTISAN],
    ['Visitor', 'Demo', 'visitor@example.com', UserRole.VISITOR],
  ] as const;
  for (const [firstName, lastName, email, role] of rows) {
    if (!(await users.exist({ where: { email } })))
      await users.save(
        users.create({
          firstName,
          lastName,
          email,
          role,
          passwordHash: await bcrypt.hash('DemoPass123!', 12),
        }),
      );
  }

  const farmer = await users.findOneByOrFail({ email: 'farmer@example.com' });
  const artisan = await users.findOneByOrFail({ email: 'artisan@example.com' });
  const ensure = async <T extends { name?: string; title?: string }>(
    entity: new () => T,
    identity: { name?: string; title?: string },
    values: Partial<T>,
  ) => {
    const repository = dataSource.getRepository(entity);
    if (!(await repository.exist({ where: identity as any })))
      await repository.save(repository.create(values as any));
  };

  await ensure(AgriculturalProduct, { name: 'Organic Coffee Beans' }, {
    name: 'Organic Coffee Beans',
    type: 'Coffee',
    description: 'Single-origin Arabica coffee grown and harvested by hand in the Colombian highlands.',
    price: 42000,
    origin: 'Salento, Quindío',
    season: 'Year-round',
    owner: farmer,
  });
  await ensure(Craft, { name: 'Handwoven Market Basket' }, {
    name: 'Handwoven Market Basket',
    description: 'A durable basket woven by local artisans using sustainably harvested natural fibers.',
    price: 78000,
    quantity: 12,
    material: 'Natural fique fiber',
    origin: 'Barichara, Santander',
    owner: artisan,
  });
  await ensure(Farm, { name: 'Mountain Coffee Farm' }, {
    name: 'Mountain Coffee Farm',
    description: 'A peaceful family farm surrounded by coffee fields, native forest, and mountain views.',
    price: 185000,
    location: 'Salento, Quindío',
    services: 'Breakfast, guided farm walk, Wi-Fi',
    capacity: 6,
    owner: farmer,
  });
  await ensure(Tour, { title: 'Coffee from Seed to Cup' }, {
    title: 'Coffee from Seed to Cup',
    description: 'Walk through the plantation, learn the harvest process, and finish with a guided tasting.',
    price: 65000,
    date: '2027-01-16',
    time: '09:00',
    location: 'Salento, Quindío',
    durationHours: 3,
    owner: farmer,
  });
  await ensure(Promotion, { title: 'Countryside Weekend' }, {
    title: 'Countryside Weekend',
    description: 'Save 15% when booking two nights and the coffee experience together.',
    startDate: '2026-09-01',
    endDate: '2027-03-31',
    owner: farmer,
  });
  await dataSource.destroy();
}
seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
