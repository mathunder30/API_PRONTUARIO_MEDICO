import dotenv from 'dotenv';
import path from 'path';

const envFiles = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(__dirname, '..', '..', '.env'),
    path.resolve(__dirname, '..', '..', '..', '.env'),
];

for (const envFile of envFiles) {
    dotenv.config({ path: envFile });
}

export const getRequiredEnv = (name: string): string => {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Variavel de ambiente obrigatoria ausente: ${name}`);
    }

    return value;
};
