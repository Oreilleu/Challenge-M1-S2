import {Request} from 'express';

const searchData = (data: any[], search: string) => {
    return data.filter(item => 
        Object.values(item).some(value =>{
            if(typeof value === 'string'){
                return value.toString().toLowerCase().includes(search.toLowerCase());
            } else if(typeof value === 'object' && value !== null){
                return Object.values(value).some((v: any) => v.toString().toLowerCase().includes(search.toLowerCase())
            );
            }
            return false
        })
    );
}

export const paginateData = (req: Request, data: any[]) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string || '';

    const filterData = searchData(data, search);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = filterData.slice(startIndex, endIndex);

    return {page, limit, total: filterData.length, data: results};
    
}