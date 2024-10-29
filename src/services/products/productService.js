import axios from 'axios'
import brandService from './brandService'
import categoryService from './categoryService'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/products'

const getAll = async () => await axios.get(API_URL)

const getById = async (id, data) => await axios.get(API_URL + `/get/${id}`, data)

const fetchProductAttributes = async () => {
  try {
    const brands = await brandService.getBrands()
    const categories = await categoryService.getAllCategory()
    const data = {
      brands: brands.data,
      categories: categories.data,
    }
    return data
  } catch (error) {
    return new Error(error)
  }
}

const addProduct = async (data) => await axios.post(API_URL + '/create', data)

const updateProduct = async (id, data) => await axios.put(API_URL + `/update/${id}`, data)

const deleteProduct = async (id) => await axios.delete(API_URL + `/delete/${id}`)

const getReview = async (id) => await axios.get(API_URL + `/${id}/reviews`)

const getFilteredProducts = async (
  page,
  pageSize,
  discount,
  sorter,
  categoryIds,
  brandIds,
  rating,
  minPrice,
  maxPrice,
  flashSale,
) =>
  await axios.get(API_URL + '/filters', {
    params: {
      page: page,
      pageSize: pageSize,
      discount: discount ?? false,
      sorter: sorter ?? 0,
      categoryIds: categoryIds.length > 0 ? categoryIds : [],
      brandIds: brandIds.length > 0 ? brandIds : [],
      rating: rating ?? null,
      minPrice: minPrice ?? null,
      maxPrice: maxPrice ?? null,
      flashSale: flashSale ?? false,
    },
    paramsSerializer: { indexes: true },
  })

const productService = {
  getAll,
  fetchProductAttributes,
  addProduct,
  getById,
  updateProduct,
  deleteProduct,
  getFilteredProducts,
  getReview,
}

export default productService
