class APIfeatures {
    constructor(query, queryString) {
      this.query = query;           // Mongoose query: productModel.find()
      this.queryString = queryString; // req.query
    }
  
    filtering() {
      const queryObj = { ...this.queryString };
      const excludeFields = ['page', 'sort', 'limit'];
      excludeFields.forEach(el => delete queryObj[el]);
  
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt|regex)\b/g, match => `${match}`);

      console.log(queryObj,queryStr);
      
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    sorting() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
  
    paginating() {
      const page = parseInt(this.queryString.page) || 1;
      const limit = parseInt(this.queryString.limit) || 10;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }
  
  module.exports = APIfeatures;  