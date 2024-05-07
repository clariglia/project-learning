import { Product } from "../type/type";

export async function service(url: string, method: string, body?: Product) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options: RequestInit = {
        method,
        headers,
    };


    if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);


    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

