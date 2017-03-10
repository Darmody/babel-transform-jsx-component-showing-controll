const isShow = attribute => attribute.type === 'JSXAttribute' && attribute.name.name === 'is-show'
const isntShow = x => !isShow(x)
const isCustomComponent = attribute => attribute.type === 'JSXAttribute' && attribute.name.name === 'show-tag'
const isntCustomComponent = x => !isCustomComponent(x)

export default ({ types: t }) => ({
  visitor: {
    JSXElement: path => {
      const { node } = path
      const attributes = node.openingElement.attributes
      if (!attributes) return
      const isShowAttribute = attributes.filter(isShow)[0]
      const showTagAttribute = attributes.filter(isCustomComponent)[0]
      if (isShowAttribute || showTagAttribute) {
        const opening = t.JSXOpeningElement(
          node.openingElement.name, attributes.filter(x => isntShow(x) && isntCustomComponent(x))
        )
        const tag = t.JSXElement(opening, node.closingElement, node.children)

        const customComponentAttribute = attributes.filter(isCustomComponent)[0]
        const tagName = customComponentAttribute ? customComponentAttribute.value.value : 'InLoading'
        const notShow = t.JSXOpeningElement(t.JSXIdentifier(tagName), [])
        const CloseNotShow = t.JSXClosingElement(t.JSXIdentifier(tagName))
        const otherTag = t.JSXElement(notShow, CloseNotShow, [])

        const conditional = t.conditionalExpression(
          (!isShowAttribute || !isShowAttribute.value || isShowAttribute.value.expression),
          tag,
          otherTag,
        )
        path.replaceWith(conditional)
      }
    }
  }
})
