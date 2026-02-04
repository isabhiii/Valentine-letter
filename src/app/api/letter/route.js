import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import Redis from 'ioredis';

// Check for REDIS_URL to determine if we should use Redis or local mock
const USE_REDIS = !!process.env.REDIS_URL;
const STORAGE_DIR = path.join(process.cwd(), 'data', 'letters');

// Create Redis client only if REDIS_URL is available
let redis = null;
if (USE_REDIS) {
    redis = new Redis(process.env.REDIS_URL);
}

export async function POST(request) {
    try {
        const { data } = await request.json();
        if (!data) {
            return NextResponse.json({ error: 'Missing letter data' }, { status: 400 });
        }

        const id = nanoid(6);

        console.log('API Request - USE_REDIS:', USE_REDIS);
        console.log('Available Env Keys:', Object.keys(process.env).filter(key => key.includes('KV') || key.includes('REDIS')));

        if (USE_REDIS && redis) {
            // Production: Save to Redis with 7-day expiry
            await redis.set(`letter:${id}`, data, 'EX', 60 * 60 * 24 * 7);
            console.log('Successfully saved to Redis with ID:', id);
        } else {
            // Check if we are on Vercel but without Redis
            if (process.env.VERCEL) {
                console.error('CRITICAL: Vercel environment detected but REDIS_URL is missing.');
                return NextResponse.json({
                    error: 'Redis not connected. Please connect a Redis store in the Vercel dashboard.',
                    isVercel: true
                }, { status: 503 });
            }

            // Local Development: Save to filesystem mock
            await fs.mkdir(STORAGE_DIR, { recursive: true });
            const filePath = path.join(STORAGE_DIR, `${id}.json`);
            await fs.writeFile(filePath, JSON.stringify({ data, createdAt: new Date().toISOString() }));
        }

        return NextResponse.json({ id });
    } catch (error) {
        console.error('Error saving letter:', error);
        return NextResponse.json({ error: 'Failed to save letter', details: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing letter ID' }, { status: 400 });
        }

        let encodedData = null;

        try {
            if (USE_REDIS && redis) {
                // Production: Retrieve from Redis
                encodedData = await redis.get(`letter:${id}`);
            } else {
                // Local Development: Retrieve from filesystem mock
                const filePath = path.join(STORAGE_DIR, `${id}.json`);
                const fileData = await fs.readFile(filePath, 'utf8');
                const json = JSON.parse(fileData);
                encodedData = json.data;
            }

            if (!encodedData) {
                return NextResponse.json({ error: 'Letter not found' }, { status: 404 });
            }

            return NextResponse.json({ data: encodedData });
        } catch (e) {
            console.error('Error retrieving letter:', e);
            return NextResponse.json({ error: 'Letter not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error retrieving letter:', error);
        return NextResponse.json({ error: 'Failed to retrieve letter' }, { status: 500 });
    }
}
