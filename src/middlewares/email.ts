import { Context, Next } from 'hono';
import iEmailSchema, { IEmail } from '../schema/email';

// 首先，我们需要扩展Context类型以包含email属性
declare module 'hono' {
  interface Context {
    email?: IEmail;
  }
}

/**
 * Hono中间件来验证请求体是否符合邮件模式
 */
const EmailSchemaMiddleware = async (c: Context,next: Next) => {
  // 尝试从请求体中解析JSON
  const content = await c.req.json();
  // 使用Zod模式验证解析后的数据
  const email = iEmailSchema.safeParse(content);
  if (email.success) {
    // 如果验证通过，将邮件数据附加到Context对象
    c.email = email.data;
    // 中间件完成，无需返回任何内容
  } else {
    // 如果验证失败，返回400 Bad Request响应
    return c.json({ message: 'Bad Request' }, 400);
  }
  await next();
};

export default EmailSchemaMiddleware;
