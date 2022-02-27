import { generateVdf } from '@slowswap/vdf';

// eslint-disable-next-line
addEventListener('message', ev => {
    const data = ev.data
    const proof = generateVdf({
        ...data,
        onProgress: progress => {
            postMessage({ id: data.id, progress, proof: undefined });
        },
    });
    postMessage({ id: data.id, progress: 1.0, proof });
})
