import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}
  // DATABASE
  databaseUrl: string = this.configService.get<string>('MONGO_URL');

  // JWT
  jwtAccessSecret: string = this.configService.get('JWT_ACCESS_SECRET');
  jwtRefreshSecret: string = this.configService.get('JWT_REFRESH_SECRET');
  jwtAccessExpiration: number = this.configService.get('JWT_ACCESS_EXPIRATION');
  jwtRefreshExpiration: number = this.configService.get(
    'JWT_REFRESH_EXPIRATION',
  );

  // FIREBASE
  type: string = this.configService.get<string>('type');
  projectId: string = this.configService.get<string>('project_id');
  privateKeyId: string = this.configService.get<string>('private_key_id');
  privateKey: string = this.configService.get<string>('private_key');
  clientEmail: string = this.configService.get<string>('client_email');
  clientId: string = this.configService.get<string>('client_id');
  authUri: string = this.configService.get<string>('auth_uri');
  tokenUri: string = this.configService.get<string>('token_uri');
  authProvider: string = this.configService.get<string>(
    'auth_provider_x509_cert_url',
  );
  clientX509: string = this.configService.get<string>('client_x509_cert_url');
  firebaseUrl: string = this.configService.get<string>('firebase_url');
  storageBucket: string = this.configService.get<string>('storage_bucket');

  // PASSWORD
  password: string = this.configService.get<string>('PASSWORD_DEFAULT');

  // AWS S3
  accessKeyId: string = this.configService.get<string>('ACCESS_KEY_ID');
  secretAccessKey: string = this.configService.get<string>('SECRET_ACCESS_KEY')
  region: string = this.configService.get<string>('REGION')
}
