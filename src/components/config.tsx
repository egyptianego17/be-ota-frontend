interface Config {
    development: {
        baseUrl: string;
    };
    production: {
        baseUrl: string;
    };
}

const config: Config = {
    development: {
        baseUrl: 'http://localhost:3002',
    },
    production: {
        baseUrl: 'https://mere-gerta-xavis.koyeb.app',
    },
};

export default config;
