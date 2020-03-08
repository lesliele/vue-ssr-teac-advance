export default {
  updateCount (state, { num, num2 }) {
    console.log(num, num2)
    state.count = num;
  }
}
