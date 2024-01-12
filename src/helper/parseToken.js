function parseToken(token) {
  let tkn = localStorage.getItem(`${token}`);
  let encodetkn = tkn.split(".")[1];
  //   let decodetkn = JSON.parse(atob(encodetkn));
  return encodetkn;
}

export default parseToken;
