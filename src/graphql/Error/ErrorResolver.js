import { AuthenticationError } from "apollo-server";

export const errorResolver = {
    Query: {
        authenticationError: () => {
            throw new AuthenticationError("Login necessario");
        },
    },
};
