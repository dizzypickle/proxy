export interface Env {
    HOSTNAME: string
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
    try {
        const url = new URL(request.url)
        url.hostname = env.HOSTNAME

        const init: RequestInit = {
            method: request.method,
            headers: request.headers,
            body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
        }

        console.log('URL:', url.toString())

        const response = await fetch(url.toString(), init)

        return new Response(response.body, {
            status: response.status,
            headers: response.headers,
        })
    } catch {
        return new Response(null, { status: 502 })
    }
}
