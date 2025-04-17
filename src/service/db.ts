import { PrismaClient } from '@prisma/client';
import { SecretsManager } from 'aws-sdk';
import { encodeSpecialCharacters } from '../regex';

const sm = new SecretsManager({
	region: 'us-east-1',
	accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
	...(process.env.AWS_SESSION_TOKEN && { sessionToken: process.env.AWS_SESSION_TOKEN }),
});
let db: PrismaClient;

export const getDB = async () => {
	if (db) return db;

	let url = '';
	try {
		const dbURL = await sm
			.getSecretValue({
				SecretId: process.env.SECRET_ID ?? '',
				VersionStage: 'AWSCURRENT',
			})
			.promise();
		const secretString = JSON.parse(dbURL.SecretString ?? '{}');
		url = `postgresql://${secretString.username}:${encodeSpecialCharacters(
			secretString.password
		)}@${process.env.HOST_DB}:5432/${process.env.DB}?sslmode=disable`;
	} catch (e) {
		console.error('Error getting secret', e);
	}

	db = new PrismaClient({ datasources: { db: { url } } });
	return db;
};
