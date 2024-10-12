import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionFilter } from './common/exception/base.exception.filter';
import { HttpExceptionFilter } from './common/exception/http.exception.filter';
import { generateDocument } from './doc';

declare const module: any;

// 底层平台改为使用fastify,替换默认的Express
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // 接口版本化管理，为API启用基于URI的版本控制，/v1/user 和 /v2/user 可以代表不同版本的用户接口。
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常过滤器，注意引入顺序
  app.useGlobalFilters(new AllExceptionFilter(), new HttpExceptionFilter());

  // 创建文档
  generateDocument(app);

  // 添加热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      app.close();
    });
  }

  await app.listen(3000);
}
bootstrap();
