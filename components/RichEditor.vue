<template>
  <div class='editor-container'>
    <div v-if="editor">
      <bubble-menu
        class="bubble-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
      >
        <button :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
          Bold
        </button>
        <button :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
          Italic
        </button>
        <button :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
          Strike
        </button>
        <button :class='isActiveStyle("code")' title='Inline Code' @click="editor.chain().focus().toggleCode().run()">
          Monospace
        </button>
        <button class='menu-item' title='Hyperlink' @click="toggleLink">
          Link
        </button>
      </bubble-menu>

      <floating-menu
        class="floating-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
      >
        <button :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
          H1
        </button>
        <button :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
          H2
        </button>
        <button :class='isActiveStyle("bulletList")' title='Bullet List'  @click="editor.chain().focus().toggleBulletList().run()">
          <b-icon icon='format-list-bulleted' />
        </button>
        <button :class='isActiveStyle("orderedList")' title='Numbered List' @click="editor.chain().focus().toggleOrderedList().run()">
          <b-icon icon='format-list-numbered' />
        </button>
        <button :class='isActiveStyle("codeBlock")' title='Code Block' @click="editor.chain().focus().toggleCodeBlock().run()">
          <b-icon icon='xml' />
        </button>
        <button class='menu-item' title='Horizontal Rule' @click="editor.chain().focus().setHorizontalRule().run()">
          <b-icon icon='border-horizontal' />
        </button>
        <button class='menu-item' title='Hard Break' @click="editor.chain().focus().setHardBreak().run()">
          <b-icon icon='format-text-wrapping-wrap' />
        </button>
      </floating-menu>
    </div>

    <div v-if='editor' class='menu-bar'>
      <button :class='isActiveStyle("bold")' title='Bold' @click="editor.chain().focus().toggleBold().run()">
        <b-icon icon='format-bold' />
      </button>
      <button :class='isActiveStyle("italic")' title='Italics' @click="editor.chain().focus().toggleItalic().run()">
        <b-icon icon='format-italic' />
      </button>
      <button :class='isActiveStyle("strike")' title='Strikethrough' @click="editor.chain().focus().toggleStrike().run()">
        <b-icon icon='format-strikethrough' />
      </button>
      <button :class='isActiveStyle("code")' title='Inline Code' @click="editor.chain().focus().toggleCode().run()">
        <b-icon icon='code-tags' />
      </button>
      <button class='menu-item' title='Hyperlink' @click="toggleLink">
        <b-icon icon='link' />
      </button>
      <div class='menu-divider' />
      <button :class='isActiveStyle("heading", {level: 1})' title='Header 1'  @click="editor.chain().focus().toggleHeading({level: 1}).run()">
        <b-icon icon='format-header-1' />
      </button>
      <button :class='isActiveStyle("heading", {level: 2})' title='Header 2' @click="editor.chain().focus().toggleHeading({level: 2}).run()">
        <b-icon icon='format-header-2' />
      </button>
      <button :class='isActiveStyle("heading", {level: 3})' title='Header 3' @click="editor.chain().focus().toggleHeading({level: 3}).run()">
        <b-icon icon='format-header-3' />
      </button>
      <button :class='isActiveStyle("heading", {level: 4})' title='Header 4' @click="editor.chain().focus().toggleHeading({level: 4}).run()">
        <b-icon icon='format-header-4' />
      </button>
      <button :class='isActiveStyle("paragraph")' title='Paragraph' @click="editor.chain().focus().setParagraph().run()">
        <b-icon icon='reorder-horizontal' />
      </button>
      <div class='menu-divider' />
      <button :class='isActiveStyle("bulletList")' title='Bullet List'  @click="editor.chain().focus().toggleBulletList().run()">
        <b-icon icon='format-list-bulleted' />
      </button>
      <button :class='isActiveStyle("orderedList")' title='Numbered List' @click="editor.chain().focus().toggleOrderedList().run()">
        <b-icon icon='format-list-numbered' />
      </button>
      <button :class='isActiveStyle("blockquote")' title='Blockquote' @click="editor.chain().focus().toggleBlockquote().run()">
        <b-icon icon='format-quote-close' />
      </button>
      <button :class='isActiveStyle("codeBlock")' title='Code Block' @click="editor.chain().focus().toggleCodeBlock().run()">
        <b-icon icon='xml' />
      </button>
      <div class='menu-divider' />
      <button class='menu-item' title='Horizontal Rule' @click="editor.chain().focus().setHorizontalRule().run()">
        <b-icon icon='border-horizontal' />
      </button>
      <button class='menu-item' title='Image' @click="setImage">
        <b-icon icon='image' />
      </button>
      <button class='menu-item' title='Hard Break' @click="editor.chain().focus().setHardBreak().run()">
        <b-icon icon='format-text-wrapping-wrap' />
      </button>
    </div>

    <editor-content :editor="editor" />
  </div>
</template>

<script>
import {
  Editor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/vue-2'
import {Link} from '@tiptap/extension-link'
import {Image} from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu
  },

  props: {
    value: {
      type: String,
      default: '',
    }
  },

  data() {
    return {
      editor: null,
    }
  },
  watch: {
    value(v) {
      if (this.editor.getHTML() !== v) {
        this.editor.commands.setContent(v, false)
      }
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Link,
        Image
      ],
      value: this.value,
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      }
    })
  },

  methods: {
    toggleLink() {
      if (this.editor.getAttributes('link').href)
        return this.editor.chain().focus().unsetLink().run()
      const href = prompt('Enter a URL')
      this.editor.chain().focus().setLink({href}).run()
    },

    setImage() {
      const src = prompt('Enter a URL for the image you want to display.')
      this.editor.chain().focus().setImage({src}).run()
    },

    isActiveStyle(name, ...options) {
      return this.editor.isActive(name, ...options) ? 'active' : ''
    }
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style lang='scss'>
.editor-container {
  border: 3px solid black;
  border-radius: .75rem;
}

.menu-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 1rem;
  border-bottom: 3px solid black;

  button {
    background: transparent;
    border: none;
    border-radius: .4rem;
    padding: .25rem;
    margin: auto 0.125rem;

    &:hover {
      @extend .active;
    }
  }

  .menu-divider {
    width: 2px;
    height: 1.25rem;
    margin: auto .5rem;
    background: #ccc;
  }

  .active {
    color: white;
    background-color: black;
  }
}

.ProseMirror {
  outline: none;
  padding: 2rem;
}

.bubble-menu {
  display: flex;
  background-color: #0D0D0D;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    color: #FFF;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}

.floating-menu {
  display: flex;
  background-color: #0D0D0D10;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
</style>
