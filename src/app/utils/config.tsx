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
        baseUrl: 'https://inland-katee-xavis-0b1b3b63.koyeb.app',
    },
};

export default config;
