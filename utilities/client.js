import { createClient } from '@sanity/client'
import imageUtlBuilder from '@sanity/image-url';

export const client = createClient(
    {
        projectId: '27p517bf',
        dataset: 'production',
        apiVersion: '2024-12-01',
        useCdn: true,
        token: 'skXNcTwNAsYabVzjrTUc9UtRbyAV23e4vVm5tIfdpd02vjaC0xpLWRdWqqd9fzCk5Fa4EWi8V5a6O0xbDDgRHtYPTUPnwglYzeFgNwoIp1eKRwEAttf2sI49ac5EoGuFfaSqaVYWA9DkLJ3F2WXxG9g0CJ1EpttfcsdJH03Su4bqZoq9PX1u'

    }
)

const builder = imageUtlBuilder(client);

export const urlFor = (source) => builder.image(source);
