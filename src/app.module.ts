import { Module, Logger } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckService } from './app.health-check.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './api/users/users.module';
import { ProductsModule } from './api/products/products.module';
import { AuthModule } from './api/auth/auth.module';
import { MarketsModule } from './api/markets/markets.module';

@Module({
  imports: [
    
    TerminusModule.forRootAsync({
      useClass: HealthCheckService
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    MarketsModule,
    AuthModule,
    ProductsModule
  ],
})
export class AppModule {
  constructor(private connection: Connection) {
    // Automatic migrations
    this.runMigrations();
  }

  public runMigrations = async () => {
    const migrationsPending = await this.connection.showMigrations();
    if (migrationsPending) {
      const migrations = await this.connection.runMigrations({ transaction: 'all' });
      migrations.forEach((migration) => {
        Logger.log(`Migration ${migration.name} success`);
      });
    } else {
      Logger.log('No migrations pending');
    }
  };
}
