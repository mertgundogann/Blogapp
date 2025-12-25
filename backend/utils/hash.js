import bcrypt from "bcrypt";

export const createPassword = async (password) => {
    const saltNumber = Number(process.env.SALT_NUMBER);
    const hashedPassword = await bcrypt.hash(password,saltNumber);
    return hashedPassword;
}

export const comparePassword = async (plain,hashed) => {
    const match = await bcrypt.compare(plain,hashed);
    return match;
}