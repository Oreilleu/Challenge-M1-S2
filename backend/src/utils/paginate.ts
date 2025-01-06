import {Request} from 'express';

const searchData = (data: any[], search: string, searchKey?: string) => {
    return data.filter((item) => {
        if(searchKey) {
            const value = item[searchKey];
            if(typeof value === 'string'){
                return value.toLowerCase().includes(search.toLowerCase());
            }
            return false;
        } else {
            return Object.values(item).some((val) => {
                if(typeof val === 'string') {
                    return val.toLowerCase().includes(search.toLowerCase());
                }
                return false;
            });
        }
    });
}

export const paginateData = (req: Request, data: any[]) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string || '';
    const searchKey = req.query.searchKey as string || '';


    const filterData = searchData(data, search, searchKey);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = filterData.slice(startIndex, endIndex);

    return {page, limit, total: filterData.length, data: results};
    
}