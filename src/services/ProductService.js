const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");

//create Product
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      type,
      price,
      description,
      rating,
      countInStock,
      image,
      discount,
      sold,
    } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "Name of product đã tồn tại",
        });
      }
      const createProduct = await Product.create({
        name,
        type,
        price,
        description,
        rating,
        countInStock,
        image,
        discount,
        sold,
      });
      if (createProduct) {
        resolve({
          status: "OK",
          messsage: "Create success!!",
          data: createProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (!checkProduct) {
        resolve({
          status: "ERR",
          message: "The Product is not defined",
        });
      }

      const updateProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailsProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkerProduct = await Product.findOne({
        _id: id,
      });
      if (checkerProduct === null) {
        resolve({
          status: "OK",
          message: "Sản phẩm không tồn tại",
        });
      }
      resolve({
        status: "OK",
        message: "Lấy thông tin sản phẩm thành công",
        data: checkerProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The Product is not defined",
        });
      }

      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete Product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteMultipleProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete Multiple Product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.count();
      let allProduct = [];
      if (filter) {
        const label = filter[0];
        const allObjectFilter = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "Success",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (!limit) {
        allProduct = await Product.find().sort({
          createdAt: -1,
          updatedAt: -1,
        });
      } else {
        allProduct = await Product.find()
          .limit(limit)
          .skip(page * limit);
      }
      resolve({
        status: "OK",
        message: "Success",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};
// const getDetailsAllProductByType =(type) =>{
//   return new Promise (async (resolve, reject) => {
//     try {
//       if(!type){
//         resolve({
//           status: 'ERR',
//           message: "Missing parameter"
//         })
//       }
//       else{
//         coca.getDetailsAllProductByType
//       }
//     }catch(e){
//       reject(e)
//     }
//   })
// }
module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllType,
  deleteMultipleProduct,
  getAllProduct,
};
