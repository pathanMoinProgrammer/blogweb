import { Extension } from '@tiptap/core';

const CustomHorizontalRule = Extension.create({
  name: 'horizontalRule',
  addAttributes() {
    return {
      width: { default: '100%' },
      thickness: { default: '2px' },
      color: { default: '#cbd5e1' },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const { width, thickness, color } = HTMLAttributes;
    return [
      'hr',
      {
        style: `width:${width};border:0;border-top:${thickness} solid ${color};margin:1rem auto;`,
      },
    ];
  },
});

export default CustomHorizontalRule;