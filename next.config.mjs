/** @type {import('next').NextConfig} */
// Portal ini tayang di https://www.pintuweb.id/link-in-bio: PintuWeb meneruskan path /link-in-bio
// ke project ini (pola multi-zone), jadi semua rute & aset hidup di bawah basePath yang sama.
const nextConfig = {
  basePath: '/link-in-bio',
  // Gambar statis + varian siap pakai (lihat app/gambar-loader.js): tidak memakai kuota Image Optimization Vercel.
  images: { loader: 'custom', loaderFile: './app/gambar-loader.js', deviceSizes: [320, 480, 640, 780, 1080], imageSizes: [160, 240] },
  async redirects() {
    // Alamat lama portal-bio.pintuweb.id di luar basePath -> alamat utama.
    return [
      { source: '/', destination: 'https://www.pintuweb.id/link-in-bio', basePath: false, permanent: true },
      { source: '/:lama((?!link-in-bio(?:/|$)).+)', destination: 'https://www.pintuweb.id/link-in-bio', basePath: false, permanent: true },
    ];
  },
};

export default nextConfig;
