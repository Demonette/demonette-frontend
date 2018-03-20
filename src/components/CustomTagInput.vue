<script>
import BTaginput from 'buefy/src/components/taginput/Taginput';

export default {
  extends: BTaginput,
  name: 'customTagInput',
  template: BTaginput.template,
  methods: {
    customOnBlur($event) {
      this.onBlur($event);
      this.$emit('unfocused');
    },
  },
};
</script>
