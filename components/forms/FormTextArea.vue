<template>
  <tiptap-vuetify @input="$emit('input', $event)" :extensions="extensions" />
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
} from "tiptap-vuetify";

export default {
  components: { TiptapVuetify },
  name: "FormTextArea",
  props: ["name", "label", "required", "value"],
  computed: {
    defineRequired: function () {
      return this.required || false;
    },
  },

  data: function () {
    return {
      extensions: [
        [Heading, { options: { levels: [3, 4] } }],
        Bold,
        Italic,
        Blockquote,
        Link,
        ListItem,
        BulletList,
        OrderedList,
        HorizontalRule,
        Image,
      ],
    };
  },
};
</script>