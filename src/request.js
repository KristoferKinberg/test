import data from './ivar.json';

export const fetchProducts = async () => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(data);
        reject({message: 'Error'});
    }, 750);
  });
}
