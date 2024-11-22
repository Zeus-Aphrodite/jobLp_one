export default function middleware(req) {
    const auth = req.headers.get('authorization');
    const username = 'oneday';
    const password = 'hoken';

    const expectedAuth = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    if (!auth || auth !== expectedAuth) {
        return new Response('Unauthorized', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    }
}
