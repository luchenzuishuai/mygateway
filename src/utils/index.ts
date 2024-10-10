/* 读取yaml配置文件 */
import { parse } from 'yaml';
import * as path from 'path';
// import { join } from 'path';
import * as fs from 'fs';
// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

// 读取项目配置
export const getConfig = () => {
  const environment = getEnv();
  // process.cwd() 获取当前工作目录
  const yamlPath = path.join(process.cwd(), `.config/.${environment}.yaml`);

  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file); // 把yaml解析为对象
  return config;
};
