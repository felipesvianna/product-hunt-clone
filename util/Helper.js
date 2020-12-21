export function isStringEmailValida(value) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    value
  );
}

export function objetoEstaVazio(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export function isStringUrlValida(value) {
  return /^(ftp|http|https):\/\/[^"]+$/.test(value);
}
