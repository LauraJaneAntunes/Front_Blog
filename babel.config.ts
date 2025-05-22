interface BabelAPI {
    cache: (forever: boolean) => void;
}

interface BabelConfig {
    presets: string[];
    plugins: (string | [string, Record<string, any>])[];
}

module.exports = function (api: BabelAPI): BabelConfig {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
        ['module:react-native-dotenv', {
            moduleName: '@env',
            path: '.env',
        }],
        ],
    };
};