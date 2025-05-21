interface BabelAPI {
    cache: (forever: boolean) => void;
}

interface BabelConfig {
    presets: string[];
    plugins: string[];
}

module.exports = function (api: BabelAPI): BabelConfig {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
        ],
    };
};