import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://qn9ovn2pnk.execute-api.ap-northeast-2.amazonaws.com/assignment',
  headers: {'x-api-key': 'vLj6Hp4mFm4e6psGMGlMN5ChUBcJEE3qDeo5nDKj'},
});

export default api;
