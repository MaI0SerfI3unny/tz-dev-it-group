import axios from "axios"

const createInstance = (token) => {
    const BaseUrl = "http://localhost:8888/api/"
    return axios.create({
        baseURL: BaseUrl,
        headers: {
          Authorization : token
        }
    })
}


export const loginUser = async(email, password) => {
    return await axios.post("user/login", { email, password })
}

export const getPostById = async(token,id) => {
    return await createInstance(token).get(`posts/get/${id}`)
}

export const getPost = async(token,page,pageSize, sort="asc", column_sort = "guid") => {
    const paramUrl = `page=${page}&pageSize=${pageSize}&sort=${sort}&column_sort=${column_sort}`
    return await createInstance(token).get(`posts/get?${paramUrl}`)
}

export const searchPost = async(token,search) => {
    return await createInstance(token).post("/posts/search", { search })
}

export const createPost = async(token, data) => {
    return await createInstance(token).post("/posts/create", data)
}

export const updatePost = async(token,id,data) => {
    return await createInstance(token).put(`/posts/update/${id}`,data)
}

export const deletePost = async(token,id) => {
    return await createInstance(token).delete(`/posts/delete/${id}`, {
        headers: { Authorization: token }
    })
}