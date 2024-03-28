import { Context ,Next } from 'hono';

const AuthMiddleware = async (c: Context,next: Next) => {
  // 使用.header()方法获取请求头
  const token = c.req.header('Authorization');
  
  if (!c.env.TOKEN || c.env.TOKEN.length === 0) {
    return c.json({ message: 'You must set the TOKEN environment variable.' + c.env.TOKEN }, 401);
  }

  if (token !== `${"Bearer "+ c.env.TOKEN}`) { // 假设token以"Bearer "为前缀
    return c.json({ message: 'Unauthorized'+token+'.'+ c.env.TOKEN }, 401);
  }

  await next();
};

export default AuthMiddleware;
