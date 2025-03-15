
interface ResponseOptions {
    status?: number,
}

interface ErrorResponseOptions extends ResponseOptions {
    additionalData?: Record<string, unknown>,
}

export const jsonResponse = (data: Record<string, unknown>, options: ResponseOptions) =>
    new Response(JSON.stringify(data), {
      status: options.status || 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

export const errorResponse = (message: string, options?: ErrorResponseOptions) => {
    const status = options?.status || 500;
    const payload = {
        error: message,
        ...(options?.additionalData ? options.additionalData : {}),
    }

    return jsonResponse(payload, { status })
}