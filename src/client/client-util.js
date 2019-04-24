const getMenu = async (id) => {
  const url = `/api/menu/${id}`;
  try {
    const response = await fetch(url,
      {
        method: 'get',
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    const result = await response.json();
    return {menu: result, status: response.status}
  } catch (error) {
    return {errorMsg: error}
  }
};

export {getMenu}