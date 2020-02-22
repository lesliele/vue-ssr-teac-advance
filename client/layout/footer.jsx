import className from '../assets/styles/footer.styl'
import Spec from './spec.vue'

export default {
  data () {
    return {
      name: 'canvas'
    }
  },
  components: {
    Spec
  },
  render () {
    const inputAttrs = {
      type: 'number',
      placeholder: 'please enter email'
    }
    return (
      <div class={className.footer}>
        <span>To you {this.name}</span>
        <Spec></Spec>
        <input {...{
          attrs: inputAttrs,
          on: {
            input () {
              console.log('123')
            }
          }
        }}/>
      </div>
    )
  },
  mounted () {
    console.log(className)
  }
}
