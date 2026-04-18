import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Zonacrono | Software y Promoción para Eventos Deportivos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #000000, #111111)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(200,30,30,0.15) 0%, transparent 60%)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
          <h1 style={{ fontSize: 100, fontWeight: 900, letterSpacing: '-0.05em', color: '#ff3333', marginBottom: 20 }}>
            ZONACRONO
          </h1>
          <p style={{ fontSize: 40, fontWeight: 500, color: '#dddddd', letterSpacing: '-0.02em', textAlign: 'center', maxWidth: 900 }}>
            Software y Promoción para Eventos Deportivos
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
