import { prisma } from "../../lib/prisma.js";
export const testDBConnection = async () => {
    try {
        await prisma.$connect();
        console.log(" PostgreSQL connected successfully...............");
    }
    catch (error) {
        console.error(" PostgreSQL connection failed: ..............", error);
        process.exit(1);
    }
};
