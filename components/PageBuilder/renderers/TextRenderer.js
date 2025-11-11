// components/PageBuilder/renderers/TextRenderer.js
const TextRenderer = ({ component }) => {
  const styleClasses = getStyleClasses(component.styles);
  
  return (
    <div className={styleClasses}>
      <div dangerouslySetInnerHTML={{ __html: component.content?.content }} />
    </div>
  );
};

// Reuse the same helper function
const getStyleClasses = (styles) => {
  if (!styles) return '';
  
  const classMap = {
    backgroundColor: `bg-[${styles.backgroundColor}]`,
    textColor: `text-[${styles.textColor}]`,
    fontSize: {
      'xs': 'text-xs',
      'sm': 'text-sm',
      'base': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    }[styles.fontSize] || 'text-base',
    textAlign: {
      'left': 'text-left',
      'center': 'text-center',
      'right': 'text-right',
      'justify': 'text-justify',
    }[styles.textAlign] || 'text-left',
    padding: {
      'none': 'p-0',
      'small': 'p-2',
      'medium': 'p-4',
      'large': 'p-6',
      'xlarge': 'p-8',
    }[styles.padding] || 'p-4',
    borderRadius: {
      'none': 'rounded-none',
      'sm': 'rounded-sm',
      'md': 'rounded-md',
      'lg': 'rounded-lg',
      'xl': 'rounded-xl',
      'full': 'rounded-full',
    }[styles.borderRadius] || 'rounded-none',
    borderWidth: {
      '0': 'border-0',
      '1': 'border',
      '2': 'border-2',
      '4': 'border-4',
      '8': 'border-8',
    }[styles.borderWidth] || 'border-0',
    shadow: {
      'none': 'shadow-none',
      'sm': 'shadow-sm',
      'md': 'shadow-md',
      'lg': 'shadow-lg',
      'xl': 'shadow-xl',
    }[styles.shadow] || 'shadow-none',
  };

  return Object.entries(classMap)
    .filter(([key, value]) => styles[key])
    .map(([key, value]) => value)
    .concat(styles.customClasses?.split(' ') || [])
    .join(' ');
};

export default TextRenderer;