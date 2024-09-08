class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(numericFields) {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'orFields',
      'populateFields',
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Convert queryStr back to an object to manipulate
    const queryObjModified = JSON.parse(queryStr);

    Object.keys(queryObjModified).forEach((key) => {
      if (numericFields.includes(key)) {
        if (
          typeof queryObjModified[key] === 'string' &&
          Number.isNaN(Number(queryObjModified[key]))
        ) {
          delete queryObjModified[key];
        } else if (typeof queryObjModified[key] === 'string') {
          queryObjModified[key] = Number(queryObjModified[key]);
        }
      } else if (
        typeof queryObjModified[key] === 'string' &&
        queryObjModified[key].includes(',')
      ) {
        queryObjModified[key] = { $in: queryObjModified[key].split(',') };
      }
    });

    // Dynamically handle filtering by any field using $or
    if (this.queryString.orFields) {
      const orFields = this.queryString.orFields.split(',');
      const orConditions = orFields.reduce((acc, field) => {
        if (queryObjModified[field]) {
          acc.push({ [field]: queryObjModified[field] });
          delete queryObjModified[field];
        }
        return acc;
      }, []);

      if (orConditions.length > 0) {
        queryObjModified.$or = orConditions;
      }
    }
    this.query = this.query.find(queryObjModified);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-created_at');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    if (!this.queryString.page && !this.queryString.limit) return this;

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  populate(validPaths) {
    const populateFields = this.queryString.populateFields
      ? this.queryString.populateFields.split('-')
      : [];
    if (populateFields.length === 0) return this;

    populateFields.forEach((field) => {
      const [path, select] = field.split(':');

      if (!validPaths.includes(path.trim())) return;
      if (select) {
        this.query = this.query.populate({
          path: path.trim(),
          select: select
            .split(',')
            .map((s) => s.trim())
            .join(' '),
        });
      } else {
        this.query = this.query.populate(path.trim());
      }
    });

    return this;
  }

  select(fields) {
    this.query = this.query.select(fields);
    return this;
  }
}
export default APIFeatures;
