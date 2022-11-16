
interface ZenviaConfig {
    ApiToken: string;
    UserId: string;
    FromNumber: string;
}

export default { 
    ApiToken: process.env.ZENVIA_API_TOKEN_PROD,
    UserId: process.env.ZENVIA_USER_ID,
    FromNumber: process.env.ZENVIA_FROM_NUMBER,
} as ZenviaConfig;