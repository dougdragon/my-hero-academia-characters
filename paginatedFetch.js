const paginatedFetch = (
  url = 'https://myheroacademiaapi.com/api/character',
  page = 1,
  previousResponse = []
) => {
  return fetch(`${url}?page=${page}`)
    .then(response => response.json())
    .then(newResponse => {
      const results = newResponse.result;
      const response = [...previousResponse, ...results];

      if (newResponse.info.currentPage !== newResponse.info.pages) {
        page++;

        return paginatedFetch(url, page, response);
      }

      return response;
    })
    .catch(error => {
      console.log(`There was an error fetching from the API: ${error}`);
      return error;
    });
}
