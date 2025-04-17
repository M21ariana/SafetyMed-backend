import { Resolver } from "./types";


const getResolvers = () => {
	const resolvers: Resolver = {
		Query: {},
		Mutation: {},
	};

	serviceResolvers.forEach((r) => {
		Object.keys(r).forEach((key: string) => {
			if (key !== 'Query' && key !== 'Mutation') {
				resolvers[key] = r[key];
			}
		});
		resolvers['Query'] = { ...resolvers['Query'], ...r['Query'] };
		resolvers['Mutation'] = { ...resolvers['Mutation'], ...r['Mutation'] };
	});

	return { resolvers, serviceResolvers };
};

export { getResolvers };
