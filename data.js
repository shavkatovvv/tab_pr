const url = "https://food-pos-data.vercel.app/"


export const getdata = async () => {
    try {
    const res = await fetch(`${url}catalog`);
    const data = await res.json()
    return data
    } catch (error) {
        
    }
}


export const getdataContent = async (path) => {
    try {
    const res = await fetch(`${url}${path}`);
    const data = await res.json()
    return data
    } catch (error) {
        
    }
}



