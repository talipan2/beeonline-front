<template>
  <div class="wysiwyg">
    <div v-if="editor" class="wysiwyg__btn">
      <button type="button"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        <img src="~/assets/images/wysiwyg/bold.svg" alt="">
      </button>
      <button type="button"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
      <img src="~/assets/images/wysiwyg/italic.svg" alt="">

      </button>
      <button type="button"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
      <img src="~/assets/images/wysiwyg/underline.svg" alt="">

      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        <img src="~/assets/images/wysiwyg/eraser.svg" alt="">
      </button>
      <button type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <img src="~/assets/images/wysiwyg/unorderedlist.svg" alt="">
      </button>
      <button type="button"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <img src="~/assets/images/wysiwyg/orderedlist.svg" alt="">
      </button>
    </div>
    <div class="editor-container">
      <TiptapEditorContent :editor="editor" ref="editorResize"/>
      <div class="resize-handle" @mousedown="startResizing" >
        <div class="resize-handle__btn"></div>
        <div class="resize-handle__btn"></div>
        <div class="resize-handle__btn"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';

const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
    TextStyle,
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
  },
});

const emit = defineEmits(['update:modelValue']);

const isResizing = ref(false)
const startY = ref(0)
const startHeight = ref(0)
const editorResize = ref(null)

const startResizing = (event) => {
  isResizing.value = true
  startY.value = event.clientY
  startHeight.value = editorResize.value.$el.clientHeight

  window.addEventListener('mousemove', resize)
  window.addEventListener('mouseup', stopResizing)
}

const resize = (event) => {
  if (isResizing.value) {
    const newHeight = startHeight.value + (event.clientY - startY.value)
    editorResize.value.$el.style.height = `${newHeight}px`
  }
}

const stopResizing = () => {
  isResizing.value = false
  window.removeEventListener('mousemove', resize)
  window.removeEventListener('mouseup', stopResizing)
}

onMounted(() => {
  editorResize.value.$el.style.height = '150px'
  editor.value.commands.setContent(props.modelValue);

})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', resize)
  window.removeEventListener('mouseup', stopResizing)
  unref(editor).destroy();

})

</script>

<style lang="scss">

.wysiwyg {
  box-shadow: 0 1em 2em rgba(0, 0, 0, .15);
  border-radius: 1px;
  border: 1px solid rgba(0, 0, 0, .2);

  li {
    list-style-type: circle;
  }

  &__btn {
    display: flex;
    column-gap: 1.5rem;
    align-items: center;
    padding: 18px 18px;

    img {
      width: 12px;
      height: auto;
    }
  }

}


.editor-container {
  overflow: auto;
  width: 100%;
  min-height: 10rem;
  max-width: 40rem;
  resize: none;
  padding-inline: 10px;
  position: relative;

  &:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .ProseMirror {
    /* Основные стили для редактора */
    padding: .8rem;
    font-size: 1.4rem;
    line-height: 1em;
    position: absolute;
    bottom: 1.5rem;
    padding-inline: 1rem;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 33rem;
    box-sizing: border-box;
    overflow: auto;
    outline: none;
    box-shadow: none;
    // margin-right: 10px;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .resize-handle {
    // border:1px solid red;
    position: absolute;
    bottom: 0;
    left: -2px;
    right: 19px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-block: 1px;
    height: 10px;
    cursor: s-resize;
    background-color: hsla(0, 0%, 50.2%, .11);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top: 1px solid rgba(0, 0, 0, .2);

    &__btn {
      width: 20px;
      margin: 1px auto;
      border-top: 1px solid rgba(0, 0, 0, .2);
    }
  }
}

</style>