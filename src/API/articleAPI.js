import axios from './axios';
import authHeader from './localStorage';


const baseURL = `https://blog.kata.academy/api/articles`;


//пробный на аксиос
//проверка в кардлист прошла успешно
export const getArticleList =  async (offset = 0, limit = 5) => {
  const articles = await axios
    .get('articles', { params: { offset, limit } })
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })
    
  return articles
}


//пробный на аксиос
//проверка прошла успешно
export const postFavorited = async (slug) => {
  const config = {
    method: 'post',
    url: `articles/${slug}/favorite`,
    ...authHeader(),
  }
  return axios(config)
    .then(() => true)
    .catch((e) => {
      throw e
    })
}


//пробный на аксиос
//проверка прошла успешно
export const delFavorited = async (slug) => {
  const config = {
    method: 'delete',
    url: `articles/${slug}/favorite`,
    ...authHeader(),
  }
  return axios(config)
    .then(() => true)
    .catch((e) => {
      throw e
    })
}


export function getArticle(slug) {
  const token = localStorage.getItem('token');
  return fetch(`${baseURL}/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
}
 

//проверка провалилась 
// export const getArticle = async (slug) => {
//   const article = await axios
//     .get(`articles/${slug}`)
//     .then((response) => response.json())
//     .catch((error) => {
//       throw new Error(`${error.message}`)
//     })
//   return article
// }

export function newArticle(data) {
  const token = localStorage.getItem('token');
  const { title, body, description, tagList } = data;
  return fetch(`${baseURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title: title,
        description: description,
        tagList: tagList,
        body: body,
      },
    }),
  }).then((response) => response.json());
}

// export const newArticle = async (data) => {
//   const { title, body, description, tagList } = data;
//   const article = await axios
//     .post('articles/', { ...authHeader() }, { 
//       body: JSON.stringify({
//               article: {
//                 title: title,
//                 description: description,
//                 tagList: tagList,
//                 body: body,
//               },})
//      })
//     .then((res) => res.data.article)
//     .catch((error) => {
//       throw error
//     })
//   return article
// }


export function editArticle(slug, data) {
  const token = localStorage.getItem('token');
  const { title, body, description, tagList } = data;
  return fetch(`${baseURL}/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title: title,
        description: description,
        tagList: tagList,
        body: body,
      },
    }),
  }).then((response) => response.json());
}

//пробный на аксиос
//ошибка при редактировании

// export const   editArticle = async (slug, data) => {
//   const { title, body, description, tagList } = data;
//   const article = await axios
//     .put(`articles/${slug}`, { article: 
//       {
//                 title: title,
//                 description: description,
//                 tagList: tagList,
//                 body: body,
//               }, }, { ...authHeader() })
//     .then((res) => res.data.article)
//     .catch((error) => {
//       throw error
//     })
//   return article
// }


//пробный на аксиос
// проверка в Кард прошла успешно

export const deleteArticle = async (slug) => {
  await axios.delete(`articles/${slug}`, { ...authHeader() }).catch((error) => {
    throw error
  })
  return true
}