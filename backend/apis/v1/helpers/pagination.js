module.exports = (objPagination, query, countCourses) => {
    if (query.page) {
        objPagination.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objPagination.limitItems = parseInt(query.limit);
    }
    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItems;

    objPagination.totalPage = Math.ceil(countCourses/objPagination.limitItems);
    return objPagination;
}