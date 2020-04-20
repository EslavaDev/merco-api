export const roleDictionary = (role: number) => {
   const roleValue = { 1: 'customer',
    2: 'market',
    3: 'admin'}

    return roleValue[role] || 'none';
}