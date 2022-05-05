import { Context } from 'koa';

export function logger() {
    return async (ctx: Context, next: () => Promise<void>) => {
        const start = process.hrtime();
        await next();
        const ms = process.hrtime()[0] - start[0];
        console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}`);
    }
}