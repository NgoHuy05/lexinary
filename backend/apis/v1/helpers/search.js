module.exports = (query) => {
    let objSearch = {
        keyword: "",
        regex: null, 
    };

    if (query.keyword) {
        objSearch.keyword = query.keyword;
        objSearch.regex = new RegExp(objSearch.keyword, "i"); 
    }

    return objSearch;
};
