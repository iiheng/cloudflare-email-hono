import { Hono } from 'hono'
import AuthMiddleware from './middlewares/auth';
import EmailSchemaMiddleware from './middlewares/email';
import { IEmail } from './schema/email';
import Email from './controllers/email';
type Bindings = {
}

const app = new Hono<{ Bindings: Bindings }>()

// 定义邮件发送路由
app.post('/api/email',
  AuthMiddleware,
  EmailSchemaMiddleware,
  async (c) => {
    const email = c.email as IEmail;
    try {
      await Email.send(email);

    } catch (e) {
      console.error(`Error sending email: ${e}`);
      return new Response(`Error sending email: ${e}`, { status: 500 });
    }

    return new Response('OK', { status: 200 });
});


export default app
