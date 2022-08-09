const { version } = require('./package.json');

const config = {
  packagerConfig: {
    name: 'ezy',
    executableName: 'ezy',
    asar: true,
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: (arch) => ({
        name: 'ezy',
        exe: 'ezy.exe',
        noMsi: true,

        setupExe: `ezy-${version}-win32-${arch}-setup.exe`,
      }),
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:`,
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/app/index.html',
              js: './src/app/renderer.tsx',
              name: 'main_window',
              preload: {
                js: './src/main/preload.ts',
              },
            },
          ],
        },
      },
    ],
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'getezy',
          name: 'ezy',
        },
        draft: true,
        prerelease: false,
      },
    },
  ],
};

module.exports = config;
