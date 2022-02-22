// export default {

//   state: {
//     products: [],
//     cep: '',
//   },

//   mutations: {

//     ADD_PRODUCT_CART(state, product) {
//       state.products.push({
//         quantityProduct: 1,
//         id: product.id,
//         product,
//       })
//     },

//     REMOVE_PRODUCT_CART(state, product) {
//       state.products = state.products.filter((productInCart, index) => {
//         return productInCart.id !== product.id
//       })
//     },

//     INCREMENT_QUANTITY_PRODUCT(state, product) {
//       state.products = state.products.map((productInCart, index) => {
//         if (productInCart.id === product.id) {
//           state.products[index].quantityProduct++
//         }
//         return state.products[index]
//       })
//     },

//     DECREMENT_QUANTITY_PRODUCT(state, product) {
//       state.products = state.products.filter((productInCart, index) => {
//         if (productInCart.id === product.id) {
//           state.products[index].quantityProduct--
//         }

//         if (state.products[index].quantityProduct > 0) {
//           return state.products[index]
//         }
//       })
//     },

//     CLEAR_CART(state) {
//       state.products = []
//     },

//     ADD_CEP(state, cep) {
//       state.cep = cep
//     },

//   },

//   // namespaced: true,
//   // getters: {
//   //   valorTotal(state) {
//   //     return state.products.map(p => p.quantidade * p.preco)
//   //       .reduce((total, atual) => total + atual, 0)
//   //   }
//   // },
// }
